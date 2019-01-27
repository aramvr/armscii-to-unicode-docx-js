import React, { Component } from "react";
import UploadFile from "./uploadFile";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div className="App">
        <p>Վերբեռնել Armsclii ֆորմատով .docx դոկումենտը։</p>
        <UploadFile />
      </div>
    );
  }
}

export default App;
