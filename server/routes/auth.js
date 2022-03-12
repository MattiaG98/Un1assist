const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");
const passport = require("passport");

const CLIENT_URL = "http://localhost:3000/";

/*
//REGISTER
router.post("/register", async (req, res) => {

  const newUser = new User({
    username: req.body.username,
    email:    req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
    console.log(savedUser);
  } catch(err) {
    res.status(500).json(err);
    console.log(err);
  }
});
*/


//REGISTER
router.post("/register", async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email:    req.body.email,
    password: CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString(),
  });

  try {
    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//LOGIN
router.post("/login", async (req, res) => {
  try{
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json("Wrong username!")

    const hashedPassword = CryptoJS.AES.decrypt(
      user.password, 
      process.env.PASS_SEC
      );
    const Originalpassword = hashedPassword.toString(CryptoJS.enc.Utf8);

    Originalpassword !== req.body.password && 
      res.status(401).json("Wrong password!");

      const accessToken = jwt.sign(
      {
        id: user._id, 
        isAdmin: user.idAdmin,
      }, 
      process.env.JWT_SEC,
       {expiresIn:"3d"}
      );

      const { password, ...others } = user._doc;

      res.status(200).json({...others, accessToken});
  } catch (err) {
    res.status(500).json(err);
  }
});



/*
//LOGIN

router.post('/login', async (req, res) => {
    try{
        const user = await User.findOne(
            {
                userName: req.body.user_name
            }
        );

        !user && res.status(401).json("Wrong User Name");

        const hashedPassword = CryptoJS.AES.decrypt(
            user.password,
            process.env.PASS_SEC
        );


        const originalPassword = hashedPassword.toString(CryptoJS.enc.Utf8);

        const inputPassword = req.body.password;
        
        originalPassword != inputPassword && 
            res.status(401).json("Wrong Password");

        const accessToken = jwt.sign(
        {
            id: user._id,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SEC,
            {expiresIn:"3d"}
        );
  
        const { password, ...others } = user._doc;  
        res.status(200).json({...others, accessToken});

    }catch(err){
        res.status(500).json(err);
    }

});
*/

router.get("/login/success", (req, res) => {
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
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect(CLIENT_URL);
});

//ACCESS WITH SOCIAL

router.get("/google", passport.authenticate("google", { scope: ["profile"] }));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/github", passport.authenticate("github", { scope: ["profile"] }));

router.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

module.exports = router;