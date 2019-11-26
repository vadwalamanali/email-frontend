import React, { Component } from 'react';
import './Layout.css';
import {
  BrowserRouter as Router,
  Route,
  Redirect } from "react-router-dom";
  import UploadFile from '../uploadFile/UploadFile'

class Layout extends Component {
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      data:[],
      layout: "",
      validUser: false
    };
    this.handleChange = this.handleChange.bind(this);
  }
  componentDidMount(){
    var token = localStorage.tc;
    fetch('/api/auth', {
    method:'POST',
    body: JSON.stringify({token: token}),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
    }).then((response) => response.json())
    .then((responseJson) => {
      token = responseJson
      this.setState({
        validUser: responseJson.validUser,
        error:responseJson.error,
        isLoading: false,
      })
      if(this.state.validUser && localStorage.tc != undefined && token != "") {
        this.getImage()
      }
    })
    .catch((error) => {
    	console.error(error);
    });
  }
  getImage() {
    fetch('/api/images/', {
      method: 'GET',
    }).then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          data: responseJson
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  handleChange(event){
    this.setState({
      layout: event.target.getAttribute("layout")
    });
  }
  render() {
      const { isLoading } = this.state;
      if(this.state.isLoading) {
        return (
          <div className="">
            Loading....
          </div>
        )
      } else if(!this.state.validUser) {
        return <div className="error"> {this.state.error}</div>
      }
        let images = [];
        Object.entries(this.state.data).forEach(([key, image]) => {
          images.push(<ImageData image={image} key={key} imageClick={this.handleChange} />)
        });
        if(this.state.layout) {
          return (
            <div>
              <UploadFile layout={this.state.layout}/>
            </div>
          )
        } else {
          return (
            <form>
              <div className="ShopCategory" id="ShopCategory">
                <h1>Layout</h1>
                <ul className="imageWrapper">
                  {images}
                </ul>
              </div>
            </form>
          )
        }
  }
}

class ImageData extends Component {
  render() {
    var image = this.props.image;
    let img = "http://localhost:8000/"+this.props.image.img
    return (
      <div>
        <li>
          <a href="JavaScript:void(0);"  onClick={this.props.imageClick}>
            <figure>
              <img src={img}  layout={image.name}  alt={image.name} />
                <figcaption>
                  <span>{image.name}</span>
                </figcaption>
            </figure>
          </a>
        </li>
      </div>
   );
 }
}
export default Layout
