import React, { Component } from 'react';

class PasswordReset extends Component{
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <input type="password" placeholder="Password" id="password"/>
        <input type="password" placeholder="Confirm Password" id="confirmPassword" />
        <button onClick={this.props.passwordSet}>Submit</button>
      </div>
    )
  }
}
export default PasswordReset;
