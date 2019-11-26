import React, { Component } from 'react';
import PasswordReset from '../passwordReset/PasswordReset';

class ForgotPassword extends Component{
  constructor(props) {
    super(props);
    this.state = { validEmail: false }
    this.emailValidCheck = this.emailValidCheck.bind(this)
    this.passwordSet = this.passwordSet.bind(this)
  }
  emailValidCheck(event) {
    event.preventDefault();
    let val = {};

    val.email = document.querySelector("#email").value;

    fetch('/api/emailCheck', {
      method:'POST',
      body: JSON.stringify(val),
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
    .then((response) => response.json())
    .then((responseJson) => {
      this.setState({
        validEmail: responseJson.validEmail,
        registerTrue: responseJson.error,
        email: val.email
      })
    })
    .catch((error) => {
      console.error(error);
    });
  }
  passwordSet(event) {
    event.preventDefault();
    let val = {};

    val.password = document.querySelector("#password").value;
    val.confirmPassword = document.querySelector("#confirmPassword").value;
    val.email = this.state.email;

    if(val.password === val.confirmPassword) {
      fetch('/api/resetPassword', {
        method:'POST',
        body: JSON.stringify(val),
        headers: new Headers({
          'Content-Type': 'application/json'
        })
      })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          passwordChanged: responseJson.passwordChanged,
          passwordNotChanged: responseJson.passwordNotChanged
        })
      })
      .catch((error) => {
        console.error(error);
      });
    } else {
      this.setState({
        passwordError: "Password Not Match"
      })
    }
  }
  render() {
    debugger
      return (
        <div className="loginWrapper">
          {
            this.state.registerTrue != undefined ?
            <a href="/register">register</a> :
            ""
          }
          {
            this.state.passwordError != undefined ?
            <div>{this.state.passwordError}</div> :
            ""
          }
          {
            this.state.passwordConfirmError != undefined ?
            <div>{this.state.passwordConfirmError}</div> :
            ""
          }
          {
            this.state.passwordNotChanged != undefined ?
            <div>{this.state.passwordNotChanged}</div> :
            ""
          }
          {
            this.state.passwordChanged != undefined ?
            <div>{this.state.passwordChanged} <a href="/login">login</a></div> :
            <div>
              <h1>ReSet Your Password</h1>
              <form action="#" method="get" autoComplete="off">
                {
                  !this.state.validEmail ?
                    <div>
                      <input type="email" placeholder="Email" id="email"/>
                      <button onClick={this.emailValidCheck}>Next</button>
                    </div>
                  : <PasswordReset passwordSet={this.passwordSet}/>
                }
              </form>
            </div>
          }
        </div>
      )
  }
}
export default ForgotPassword;
