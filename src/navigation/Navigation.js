import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { AuthProvider } from '../authContext/AuthContext'
import Landing from '../landing/Landing'
import Layout from '../layout/Layout'
import Login from '../login/Login'
import Register from '../register/Register'
import Header from '../header/Header'
import ForgotPassword from '../forgotPassword/ForgotPassword';
import ProtectedRoute from '../protectedRoute/ProtectedRoute'

const Navigation = () => (
  <div>
    <Router>
      <AuthProvider>
        <Header />
        <Switch>
          <ProtectedRoute path="/layout" component={Layout} />
          <Route path="/register" component={Register}/>
          <Route path="/login" component={Login} />
          <Route path="/forgotPassword" component={ForgotPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  </div>
)

export default Navigation;
