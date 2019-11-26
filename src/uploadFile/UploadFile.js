import React, { Component } from 'react';
import './UploadFile.css';

class UploadFile extends Component {
  constructor(props){
    super(props);
    this.state = {
    };
    this.handleSubmit = this.handleSubmit.bind(this);
}
handleSubmit(event){
  event.preventDefault();
  const data = new FormData();
  data.append('file', this.uploadInput.files[0]);
  data.append('layout', this.props.layout);
  fetch('/api/upload', {
      method: 'POST',
      body: data,
    }).then((response) => {
      response.json().then((body) => {
        this.setState({body});
      });
    });
  }
  render() {
    return (
      <div>
      {this.state.body ? (
        <div className="excelfileWrapper">
          <div>{this.state.body.layout}</div>
          <div>{this.state.body.date}</div>
          <DisplayExcelFile excelList={this.state.body.file} />
        </div>
      ) : (
        <form onSubmit={this.handleSubmit}>
          <div className="uploadExcelWrapper" id="uploadExcel">
            <h1>File Upload</h1>
            <div>
              <input ref={(ref) => { this.uploadInput = ref; }} type="file" name="layoutFile"/>
            </div>
            <div>
              <button type="submit">Upload</button>
            </div>
          </div>
        </form>
      )}
    </div>
    )
  }
}
class DisplayExcelFile extends Component {
  render() {
    let data = this.props.excelList,
        file = [];
    data.forEach(function(elm, index){
      let url = "http://localhost:8000/"+elm;
      file.push(
        <div key={index}>
          <a href={url} target="_blank"> view -> {elm}</a>
          <br/>
          <a href={url} download>{elm} -> download</a>
        </div>
      )
    })
    return (
      <div>
        {file}
      </div>
    )
  }
}
export default UploadFile;
