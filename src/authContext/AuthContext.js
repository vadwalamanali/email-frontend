import React from 'react'
import { BrowserRouter as Router,
Route, Redirect } from 'react-router-dom';

const AuthContext = React.createContext()
let val = {};

class AuthProvider extends React.Component {
  state = { validUser: false }
  constructor() {
    super()
    this.register = this.register.bind(this)
    this.login = this.login.bind(this)
    this.logout = this.logout.bind(this)
  }
  register(event){
    event.preventDefault();
    if((document.querySelector("#username").value === "") && (document.querySelector("#regemail").value === "") && (document.querySelector("#regpassword").value === "")) {
      return false
    } else if(document.querySelector("#regpassword").value === "") {
      document.querySelector("#regpassword").style.borderColor = 'red';
      return false
    } else {
      val.username = document.querySelector("#username").value;
      val.email = document.querySelector("#regemail").value;
      val.password = document.querySelector("#regpassword").value;
    }
    return fetch('/api/register', {
        method:'POST',
        body: JSON.stringify(val),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          validUser: responseJson.validUser,
          data:responseJson,
          token:responseJson.token,
          error1:responseJson.error
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  login(event) {
    event.preventDefault();
    let email,password;
    if((document.querySelector("#email").value === "") && (document.querySelector("#password").value === "")) {
      return false
    } else if(document.querySelector("#password").value === "") {
      document.querySelector("#password").style.borderColor = 'red';
    } else {
       email = document.querySelector("#email").value;
       password = document.querySelector("#password").value;
    }
    return fetch('/api/login', {
        method:'POST',
        body: JSON.stringify({email:email,password:password}),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          validUser: responseJson.validUser,
          error: responseJson.error,
          token:responseJson.token,
          data: responseJson.email,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }
  logout() {
    this.setState({ validUser: false })
    localStorage.removeItem("validUser")
  }
  render() {
    if(this.state.validUser) {
      localStorage.setItem("tc", this.state.token)
      localStorage.setItem("validUser", this.state.validUser)
    }
    return (
      <div>
      <AuthContext.Provider
        value={{
          validUser: this.state.validUser,
          login: this.login,
          register: this.register,
          logout: this.logout,
          error: this.state.error,
          data: this.state.data,
          error1 : this.state.error1
        }}
      >
        {this.props.children}
      </AuthContext.Provider>
      {
            this.state.validUser  && (<Redirect to={{
            pathname: "/layout",
            state: { validUser: this.state.validUser }
          }}/>)
      }
    </div>
    )
  }
}

const AuthConsumer = AuthContext.Consumer

export { AuthProvider, AuthConsumer }
export default AuthContext
