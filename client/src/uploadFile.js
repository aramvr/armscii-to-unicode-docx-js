import React, { Component } from "react";
import { FilePond } from "react-filepond";
import "filepond/dist/filepond.min.css";
import Loader from "react-loader-spinner";

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadLink: "",
      error: false,
      uploading: false
    };
  }
  componentDidUpdate() {}
  handleInit() {
    console.log("FilePond instance has initialised", this.pond);
  }

  upload = file => {
    const formData = new FormData();
    formData.append("document", file);

    fetch("http://localhost:3001/api/convert", {
      // Your POST endpoint
      method: "POST",
      body: formData
    })
      .then(response => response.json())
      .then(success => {
        this.setState({
          downloadLink: success.downloadLink,
          uploading: false
        });
      })
      .catch(error => {
        this.setState({
          error: true,
          uploading: false
        });
        console.log(error);
      });
  };

  reset = () => {
    this.setState({
      downloadLink: "",
      error: false,
      uploading: false
    });
  };
  render() {
    return (
      <div>
        {this.state.downloadLink === "" ? (
          <div>
            {this.state.uploading ? (
              <Loader type="Puff" color="#00BFFF" height="100" width="100" />
            ) : (
              <FilePond
                ref={ref => (this.pond = ref)}
                onupdatefiles={fileItems => {
                  this.setState({
                    uploading: true
                  });
                  this.upload(fileItems[0].file);
                }}
              />
            )}
          </div>
        ) : (
          <div>
            <p>Download from here: {this.state.downloadLink}</p>
            <button onClick={() => this.reset()}>Փոխակերպել այլ ֆայլ</button>
          </div>
        )}
      </div>
    );
  }
}

export default UploadFile;
