import React from 'react'
import { AuthConsumer } from '../authContext/AuthContext'
import { Link } from 'react-router-dom'
import './Header.css';

export default () => (
  <header>
    <AuthConsumer>
      {({ validUser, login, logout,register}) => (
        <div className="headerWrapper">
          <div className="homeWrapper">
            <Link  to="/">
              HOME
            </Link>
          </div>
          {validUser || localStorage.validUser === "true" ? (
            <ul>
              <button  onClick={logout}>Logout</button>
            </ul>
          ) : (
            <div className="loginsignupWrapper">
            <Link id="login" to="/login">Login</Link>
            <Link id="register" to="/register">SignUp</Link>
            </div>
          )}
        </div>
      )}
    </AuthConsumer>
  </header>
)
