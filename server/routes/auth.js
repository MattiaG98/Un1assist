const User = require("../models/User");
const router = require("express").Router();
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000";

const bcrypt = require("bcrypt");
const bcryptSalt = 10;

const basicAuth = require('express-basic-auth');

const auth = basicAuth({
  users: {
    admin: '123',
    user: '456',
  },
});


router.get('/authenticate', auth, (req, res) => {
  const options = {
    httpOnly: true,
    signed: true,
  };

  if (req.auth.user === 'admin') {
    res.cookie('name', 'admin', options).send({ screen: 'admin' });
  } else if (req.auth.user === 'user') {
    res.cookie('name', 'user', options).send({ screen: 'user' });
  }
});

router.get('/read-cookie', (req, res) => {
  if (req.signedCookies.name === 'admin') {
    res.send({ screen: 'admin' });
  } else if (req.signedCookies.name === 'user') {
    res.send({ screen: 'user' });
  } else {
    res.send({ screen: 'auth' });
  }
});

router.get('/clear-cookie', (req, res) => {
  res.clearCookie('name').end();
});

router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  res.redirect("http://localhost:3000/");

  // 1. Check username and password are not empty
  if (username === "" || password === "" || email === "" || password === undefined) {
    res.redirect("http://localhost:3000/");
    return;
  }

  User.findOne({ username })
    .then((user) => {
      // 2. Check user does not already exist
      if (user) {
        res.render("auth/signup", { errorMessage: "The username already exists" });
      }
      
      // Encrypt the password
      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);

      //
      // Save the user in DB
      //

      const newUser = new User({
        username: username,
        email: email,
        password: hashPass,
        isAdmin: false
      });

      newUser.save()
        .then(res.redirect("/"))
        .catch(err => next(err));        
    })
    .catch(err => next(err));
});

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});

router.post('/login', (req, res, next) => {
  passport.authenticate("local",
   {
    successRedirect: CLIENT_URL + "/src/pages/Home",
    failureRedirect: CLIENT_URL + "/src/pages/loginFailed",
    failureFlash: true
   },
   (err, theUser, failureDetails) => {
    if (err) {
      // Something went wrong authenticating user
      return next(err);
    }
  
    if (!theUser) {
      // Unauthorized, `failureDetails` contains the error messages from our logic in "LocalStrategy" {message: '…'}.
      res.render(CLIENT_URL + '/src/pages/Login', {"errorMessage": req.flash("Wrong username or password")}); 
      return;
    }

    // save user in session: req.user
    req.login(theUser, (err) => {
      if (err) {
        // Session save went bad
        return next(err);
      }

      // All good, we are now logged in and `req.user` is now set
      res.redirect(CLIENT_URL + '/src/pages/Home')
    });
  })(req, res, next);
});

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL + "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL + "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: CLIENT_URL + "/login/failed",
  })
);

router.get("/private-page", (req, res) => {
  if (!req.user) {
    res.redirect('/login'); // not logged-in
    return;
  }
  
  // ok, req.user is defined
  res.render("private", { user: req.user });
});

/* router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
}); */

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

module.exports = router