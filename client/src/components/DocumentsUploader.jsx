import axios from 'axios';

import React,{Component} from 'react';

class DocumentsUploader extends Component {

	state = {
		// Initially, no file is selected
		selectedFile: null
	};
	
	// On file select (from the pop up)
	onFileChange = event => {
		// Update the state
		this.setState({ selectedFile: event.target.files[0] });
	};
	
	// File content to be displayed after
	// file upload is complete
	fileData = () => {
		if (this.state.selectedFile) {
			return (
				<div>
					<h2>File Details:</h2>
					<p>File Name: {this.state.selectedFile.name}</p>
					<p>File Type: {this.state.selectedFile.type}</p>
					<p>
						Last Modified:{" "}
						{this.state.selectedFile.lastModifiedDate.toDateString()}
					</p>
				</div>
			);
		} else {
			return (
				<div>
					<br />
					<h4>Choose before Pressing the Upload button</h4>
				</div>
			);
		}
	};

    onFileUpload = () => {
        const formData = new FormData();
        formData.append("myDocument", this.state.selectedFile);
    
        console.log(this.state.selectedFile);
        axios.post("http://localhost:5001/api/documents/uploadSingleDoc", formData, {
          headers: {
            "Access-Control-Allow-Credentials": "*",
            "content-type": "multipart/form-data",
          },
        }); //I need to change this line
      };
	
	render() {
		return (
			<div className='docUpload-page'>
				<div className='form-container'>
					<div className='form-blurred_path'>
					
					</div>
					<div className='form-content'>
						<h1>
						Documents Upload
						</h1>
						<div>
							<input type="file" name="myDocument" onChange={this.onFileChange} />
							<button onClick={this.onFileUpload}>
							Upload!
							</button>
						</div>
						{this.fileData()}
					</div>
					
				</div>
			</div>
		);
	}
}

export default DocumentsUploader;
