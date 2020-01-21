import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import {FaTree} from 'react-icons/fa'
import {MdShoppingCart} from 'react-icons/md'

const Navbar = ({handleClick, isLoggedIn, user}) => (
  <div id="nav-container">
    <div id="logo-container">
      <Link to="/">
        <div id="logo-left">
          <h1 id="logo">DOUGLAS FIR </h1>
        </div>
        <div id="logo-tree">
          <FaTree size="60" id="logo" />
        </div>
        <div id="logo-right">
          <h1 id="logo">APOTHECARY</h1>
        </div>
      </Link>
    </div>

    <div id="nav-sub-container">
      <nav>
        {isLoggedIn ? (
          <div>
            {/* The navbar will show these links after you log in */}
            <Link to="/myprofile">My Profile</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
            <Link to="/cart">
              <MdShoppingCart size="30" />
            </Link>
          </div>
        ) : (
          <div>
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>|<Link to="/signup">Sign Up</Link>
            <Link to="/cart">
              <MdShoppingCart size="30" />
            </Link>
          </div>
        )}
      </nav>
    </div>
  </div>
)

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
