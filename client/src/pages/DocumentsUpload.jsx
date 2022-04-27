import React, { Component } from 'react';
import DocumentsUploader from '../components/DocumentsUploader';

export default class DocumentsUpload extends Component {
    render() {
        return (
          <div className="App">
            <DocumentsUploader />
          </div>
        );
      }
}