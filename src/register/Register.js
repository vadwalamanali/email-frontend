import React, { Component } from 'react';
import { BrowserRouter as Router,
Route, Redirect } from 'react-router-dom';
import AuthContext from '../authContext/AuthContext';
import { Link } from 'react-router-dom'
import './Register.css';

class Register extends Component {
  componentDidUpdate() {
    document.getElementById("login").style.display = "block";
    document.getElementById("register").style.display = "none";
  }
  render() {
    if(localStorage.validUser === "true" && localStorage.tc != undefined) {
      return (<Redirect to={{
        pathname: "/"
      }}/>)
    } else {
      delete localStorage.tc;
      delete localStorage.validUser;
      return (
        <div className="registerWrapper">
          <h1>Register</h1>
          <form action="#" method="get" autoComplete="off">
              <input type="text" placeholder="UserName" id="username"/>
              <input type="email" placeholder="Email" id="regemail"/>
              <input type="password" placeholder="Password" id="regpassword"/>
              <AuthContext.Consumer>
              {(context) => <button onClick={context.register}>SignUp</button>}
              </AuthContext.Consumer>
              <AuthContext.Consumer>
                {(context) => <div className="error">{context.error1}</div>}
              </AuthContext.Consumer>
              <Link id="login" to="/login">Login</Link>
          </form>
        </div>
      )
    }
  }
}
export default Register;
