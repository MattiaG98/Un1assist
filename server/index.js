const express = require("express")
const expressSession  = require("express-session");

const authorRouter = require('./routes/authors')
const documentRouter = require('./routes/documents')
const userRouter = require("./routes/user");
const authRouter = require("./routes/auth");
const productRouter = require("./routes/product");
const cartRouter = require("./routes/cart");
const orderRouter = require("./routes/order");

const User = require('./models/User.js');
const passportSetup = require("./passport");
const passport = require("passport");
const bcrypt = require("bcrypt");
const LocalStrategy = require("passport-local").Strategy;

const bodyParser = require("body-parser")
const cookieParser = require('cookie-parser');
const cookieSession = require("cookie-session");
const cors = require("cors");
const Router = require("express");

const Grid = require("gridfs-stream");
const multer = require("multer");
const mongoose = require("mongoose");
const MongoStore = require('connect-mongo');
const crypto = require("crypto");
var path = require('path');

const flash = require("connect-flash");

const app = Router();

const mongoURI = "mongodb+srv://UniAssistAdmin:Un1Assist@uniassistdb.wzesf.mongodb.net/Un1Assist?retryWrites=true&w=majority"
require("dotenv").config()
require("./utils/connectdb")
require("./utils/createBucket")
require("./strategies/JwtStrategy")
require("./strategies/LocalStrategy")
require("./authenticate")

app.use(bodyParser.json())
app.use(cookieParser(process.env.COOKIE_SECRET))

//Add the client URL to the CORS policy

const whitelist = process.env.WHITELISTED_DOMAINS
  ? process.env.WHITELISTED_DOMAINS.split(",")
  : []

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error("Not allowed by CORS"))
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

app.use(passport.initialize())

app.get("/", function (req, res) {
  res.send({ status: "success" })
});

app.use(flash());
app.use(
  cookieSession({ name: "session", keys: ["lama"], maxAge: 24 * 60 * 60 * 100 }) //maxAGE (OF THE SESSION --> 1day)
);
app.use(expressSession({
  secret: "our-passport-local-strategy-app",
  store: MongoStore.create({
    mongoUrl: mongoURI
  }),
  resave: true,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));

app.use("/api/auth", authRouter);
app.use("/api/author", authorRouter);
app.use("/api/documents", documentRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

passport.serializeUser((user, cb) => {
  cb(null, user._id);
});
passport.deserializeUser((id, cb) => {
  User.findById(id)
    .then(user => cb(null, user))
    .catch(err => cb(err))
  ;
});

/* passport.use(new LocalStrategy(
  {passReqToCallback: true},
  (...args) => {
    const [req,,, done] = args;

    const {username, password} = req.body;

    User.findOne({username})
      .then(user => {
        if (!user) {
          return done(null, false, { message: "Incorrect username" });
        }
          
        if (!bcrypt.compareSync(password, user.password)) {
          return done(null, false, { message: "Incorrect password" });
        }
    
        done(null, user);
      })
      .catch(err => done(err))
    ;
  }
)); */

//START SEREVR IN PORT $port/8081

const server = app.listen(process.env.PORT || 8081, () => {
  const port = server.address().port
  console.log("Server started at port: " + port);
});