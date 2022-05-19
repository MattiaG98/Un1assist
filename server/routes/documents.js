const { GridFsStorage } = require("multer-gridfs-storage");
const mongoose = require("mongoose")
const express = require('express')
const documentRouter = express.Router()
const Document = require('../models/document')
const Author = require('../models/author')
const imageMimeTypes = ['image/jpeg', 'image/png', 'images/gif']
const multer = require('multer')

require("dotenv")
  .config();

const mongoURI = "mongodb+srv://UniAssistAdmin:Un1Assist@uniassistdb.wzesf.mongodb.net/Un1Assist?retryWrites=true&w=majority"

const storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      const filename = file.originalname;
      const fileInfo = {
        filename: filename,
        bucketName: "documents"
      };
      resolve(fileInfo);
    });
  }
});

const upload = multer({
  storage
});

//CARICA IL DOCUMENTO 
documentRouter.post(
  '/uploadSingleDoc',
  upload.single('myDocument'),
  async (req, res) => {
    try {
      res.status(200).send("File uploaded successfully");
    } catch (error) {
      res.status(400).send('Error while uploading document. Try again later.');
    }
  },
  (error, req, res, next) => {
    if (error) {
      res.status(500).send(error.message);
    }
  }
);

documentRouter.get('/getAllDocuments', async (req, res) => {
  try {
    const documents = await Document.find({});
    const sortedByCreationDate = documents.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send('Error while getting list of documents. Try again later.');
  }
});

//Looks for a file with filename passed in request (and start download stream if it founds a result)
documentRouter.get("/fileinfo/:filename", (req, res) => {
  const file = bucket
    .find({
      filename: req.params.filename
    })
    .toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404)
          .json({
            err: "no files exist"
          });
      }
      bucket.openDownloadStreamByName(req.params.filename)
        .pipe(res);
    });
});

documentRouter.get('/download/:id', async (req, res) => {
  try {
    const document = await Document.findById(req.params.id);
    res.set({
      'Content-Type': document.document_mimetype
    });
    res.sendDocument(path.join(__dirname, '..', document.document_path));
  } catch (error) {
    res.status(400).send('Error while downloading document. Try again later.');
  }
});

module.exports = documentRouter