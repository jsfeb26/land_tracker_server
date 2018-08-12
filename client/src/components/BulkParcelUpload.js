import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions";

// Some resources for doing this
// https://codeburst.io/asynchronous-file-upload-with-node-and-react-ea2ed47306dd
// https://medium.com/ecmastack/uploading-files-with-react-js-and-node-js-e7e6b707f4ef

class BulkParcelUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadStatus: false
    };
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("filename", this.fileName.value);

    this.props.onFileUpload(data);
  }

  render() {
    return (
      <div className="row">
        <form className="col s12" onSubmit={this.onSubmit}>
          <div className="form-group">
            <input
              className="form-control"
              ref={ref => {
                this.uploadInput = ref;
              }}
              type="file"
            />
          </div>

          <div className="form-group">
            <input
              className="form-control"
              ref={ref => {
                this.fileName = ref;
              }}
              type="text"
              placeholder="Optional name for the file"
            />
          </div>

          <button className="btn btn-success">Upload</button>
        </form>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(BulkParcelUpload);
