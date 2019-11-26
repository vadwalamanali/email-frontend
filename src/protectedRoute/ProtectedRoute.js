import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { AuthConsumer } from '../authContext/AuthContext'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <AuthConsumer>
    {({ validUser }) => (
      <Route
        render={props =>
          validUser || localStorage.validUser  === "true"
          ? <Component {...props} /> : <Redirect to="/login" />
        }
        {...rest}
      />
    )}
  </AuthConsumer>
)

export default ProtectedRoute
