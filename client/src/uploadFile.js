import React, { Component } from "react";
import { FilePond } from "react-filepond";
import LinearProgress from "@material-ui/core/LinearProgress";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

import "filepond/dist/filepond.min.css";

const ButtonWrapper = styled.div`
  float: left;
  margin-right: 10px;
  display: inline-block;
  margin-top: 35px;
`;

const LoaderWrapper = styled.div`
  margin-top: 50px;
`;

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      downloadLink: "",
      error: false,
      uploading: false
    };
  }
  upload = file => {
    const ext = file.name.split(".").pop();
    if (ext !== "docx") {
      alert("Ֆայլի ֆորմատը սխալ է։");
      this.reset();
      return;
    }
    const formData = new FormData();
    formData.append("document", file);

    fetch("http://unicode.aramvardanyan.me/api/convert", {
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
              <LoaderWrapper>
                <LinearProgress />
              </LoaderWrapper>
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
            <ButtonWrapper>
              <Button
                variant="contained"
                color="primary"
                href={this.state.downloadLink}
              >
                Ներբեռնել
              </Button>
            </ButtonWrapper>
            <ButtonWrapper>
              <Button variant="contained" onClick={() => this.reset()}>
                Փոխակերպել այլ ֆայլ
              </Button>
            </ButtonWrapper>
          </div>
        )}
      </div>
    );
  }
}

export default UploadFile;
