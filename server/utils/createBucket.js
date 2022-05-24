const mongoose = require("mongoose")
const Grid = require("gridfs-stream");
const multer = require("multer");

let bucket;
mongoose.connection.on("connected", () => {
  var client = mongoose.connections[0].client;
  var db = mongoose.connections[0].db;
  bucket = new mongoose.mongo.GridFSBucket(db, {
    bucketName: "documents"
  });
  exports.bucket = bucket;
  console.log(bucket);
});