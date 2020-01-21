import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getOrder} from '../store/userOrder'

/**
 * COMPONENT
 */
export class UserHome extends React.Component {
  componentDidMount() {
    this.props.getOrder()
  }

  render() {
    const orderInformation = this.props.userOrder

    return (
      <div>
        <h3>
          Welcome, {this.props.user.firstName} {this.props.user.lastName}!
        </h3>
        <h4>Your profile information:</h4>
        <ul>First Name: {this.props.user.firstName}</ul>
        <ul>Last Name: {this.props.user.lastName}</ul>
        <ul>Email: {this.props.user.email}</ul>
        <ul>Address: {this.props.user.address}</ul>
        <ul>Phone: {this.props.user.phone}</ul>
        <h3>Order History:</h3>

        <div>
          {orderInformation.length &&
            orderInformation.map(order => {
              return (
                <div key={order.id}>
                  <div>Order Id: {order.id}</div>
                  <div>Order Status: {order.status}</div>
                  <div>
                    {order.cart_items.map(cart_item => {
                      return (
                        <div key={cart_item.id}>
                          <ul>Product Name: {cart_item.product.name}</ul>
                          <ul>Product Quantity: {cart_item.quantity}</ul>
                          <ul>
                            Product Price:{' '}
                            {`$${(cart_item.product.price / 100).toFixed(2)}`}
                          </ul>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
        </div>
      </div>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    user: state.user,
    userOrder: state.userOrder
  }
}

const mapDispatch = dispatch => {
  return {
    getOrder: () => dispatch(getOrder())
  }
}

export default connect(mapState, mapDispatch)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
