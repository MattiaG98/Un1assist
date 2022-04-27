const express = require("express")
const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const documentRouter = require('./routes/documents')
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");

const cookieSession = require("cookie-session");
const cors = require("cors");
const Router = require("express");


const Grid = require("gridfs-stream");
const multer = require("multer");
const mongoose = require("mongoose");
const crypto = require("crypto");
var path = require('path');

const app = Router();
const PORT = 5001;

const mongoURI = "mongodb+srv://UniAssistAdmin:Un1Assist@uniassistdb.wzesf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
    .connect(mongoURI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        }).then(() => console.log("DBConnection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

//CREAZIONE BUCKET
let bucket;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket"
  });
  console.log(bucket);
});

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use("/api/auth", authRoutes);
app.use("/api/index", indexRouter);
app.use("/api/author", authorRouter);
app.use("/api/documents", documentRouter);
app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

app.listen(5001, () => {
  console.log("Backend server is runnning...");
});


//------------IMPORTS------------------------

/*
const Router = require("express");
const { GridFsStorage } = require("multer-gridfs-storage");
const Grid = require("gridfs-stream");
const multer = require("multer");
const mongoose = require("mongoose");
const crypto = require("crypto");
var path = require('path');

const cookieSession = require("cookie-session");
const cors = require("cors");
const passport = require("passport");
require("./models/document");

const dotenv = require("dotenv");
const bodyParser = require('body-parser');

const indexRouter = require('./routes/index')
const authorRouter = require('./routes/authors')
const documentRouter = require('./routes/documents')
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");


//--------------------------------------------

const app = Router();
const PORT = 5001;

dotenv.config();

const mongoURI = "mongodb+srv://UniAssistAdmin:Un1Assist@uniassistdb.wzesf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

mongoose
    .connect(mongoURI,{
        useUnifiedTopology: true,
        useNewUrlParser: true,
        }).then(() => console.log("DBConnection Successfull!"))
    .catch((err) => {
        console.log(err);
    });

//FOLDER STORAGE DOCUMENT

var storage = multer.diskStorage(
    {
        destination: './public/DocumentsFolder',
        filename: function (req, file, cb ) {
            cb( null, file.originalname);
        }
    }
);

const upload = multer({ storage: storage } )

// serving front end build files
app.use(express.static(__dirname + "/public/DocumentsFolder"));


//--------------------------------------------------

//DOCUMENT UPLOAD ON MONGO

//creating bucket when enstablished the connection with MongoDB Atlas
let gfs;
mongoose.connection.on("connected", () => {
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "newBucket"
  });
  console.log(bucket);
});

//to parse json content
app.use(express.json());

//to parse body from url
app.use(express.urlencoded({
  extended: false
}));

const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: "newBucket"
        };
        resolve(fileInfo);
      });
    }
  });


// route for file upload
app.post("/routes/documents/upload", upload.single('myFile'), (req, res, next) => {
    console.log(req.file.originalname + " file successfully uploaded !!");
    res.sendStatus(200);
});

//----------------------------------------

const router = express.Router();
app.use(cors());
app.use('/upload', documentRouter);

app.use(express.json());
app.use(
    cookieSession({ name: "session", keys: ["mattia"], maxAge: 24 * 60 * 60 * 100 })
    );

app.use("/auth", authRoute);

app.get("/",(req,res)=>{
    return res.send("<p>hello!</p>");
 });

 app.post('/upload', upload.single('file'), (req, res) => {
    res.redirect('/');
  });

app.listen(5001, () => {
    console.log("Backend server is runnning...");
});

*/