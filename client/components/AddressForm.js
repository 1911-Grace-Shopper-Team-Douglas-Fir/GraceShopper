import React from 'react'
import {connect} from 'react-redux'
import {addUserInfo} from '../store/user'

class AddressForm extends React.Component {
  constructor() {
    super()
    this.state = {
      firstName: '',
      lastName: '',
      address: '',
      phone: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  render() {
    return (
      <div>
        <form
          onSubmit={this.handleSubmit}
          name={name}
          onChange={this.handleChange}
        >
          <div>
            <label htmlFor="firstName">
              <small>First Name</small>
            </label>
            <input name="firstName" type="text" />
          </div>
          <div>
            <label htmlFor="lastName">
              <small>Last Name</small>
            </label>
            <input name="lastName" type="text" />
          </div>
          <div>
            <label htmlFor="address">
              <small>Address</small>
            </label>
            <input name="address" type="text" />
          </div>
          <div>
            <label htmlFor="phone">
              <small>Phone</small>
            </label>
            <input name="phone" type="tel" />
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    )
  }
  handleSubmit(event) {
    event.preventDefault()
    const userToUpdate = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      address: this.state.address,
      phone: this.state.phone
    }
    this.props.addUserInfo(userToUpdate, this.props.user.id)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addUserInfo: (userInfo, userId) => dispatch(addUserInfo(userInfo, userId))
  }
}

export default connect(mapState, mapDispatch)(AddressForm)
