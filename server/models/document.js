const mongoose = require('mongoose');

const documentSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    description: {
      type: String,
      required: true,
      trim: true
    },
    document_path: {
      type: String,
      required: true
    },
    document_mimetype: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Document = mongoose.model('Document', documentSchema);

module.exports = Document;