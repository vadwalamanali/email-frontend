import React, { Component } from 'react';
import AuthContext from '../authContext/AuthContext';
import { BrowserRouter as Router,
Route, Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
//import ForgotPassword from '../forgotPassword/ForgotPassword';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
  }
  componentDidUpdate() {
    document.getElementById("login").style.display = "none";
    document.getElementById("register").style.display = "block";
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
        <div className="loginWrapper">
          <h1>Login</h1>
          <form action="#" method="get" autoComplete="off">
              <input type="email" email placeholder="Email" id="email"/>
              <input type="password" placeholder="Password" id="password"/>
              <Link  to="/forgotPassword">Forgot password?</Link>
              <AuthContext.Consumer>
                {(context) => <button onClick={context.login} >Login</button>}
              </AuthContext.Consumer>
              <AuthContext.Consumer>
                {(context) => <div className="error">{context.error}</div>}
              </AuthContext.Consumer>
          </form>
        </div>
      )
    }
  }
}
export default Login;
