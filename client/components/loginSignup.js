import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

export default class loginSignup extends React.Component {
  constructor() {
    super()
  }

  render() {
    return (
      <div>
        <div>
          <Link to="/login">
            <button name="home">HomePage</button>
          </Link>
        </div>

        <div className="customerauth-style">
          <div>Are you a returning customer?</div>
          <Link to="/login">
            <button name="login">Login</button>
          </Link>
        </div>

        <div className="customerauth-style">
          <div>New to our site?</div>
          <Link to="/signup">
            <button name="signup">Sign Up</button>
          </Link>
        </div>
      </div>
    )
  }
}
