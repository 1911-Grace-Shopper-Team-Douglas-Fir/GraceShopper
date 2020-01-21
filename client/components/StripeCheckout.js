import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import AddressForm from './AddressForm'
import {addOrder, fetchOrder} from '../store/orders'
import {addId} from '../store/cart'

class StripeCheckout extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await axios.post('/api/checkout', token)

    if (response.data.status === 'succeeded') {
      this.setState({complete: true})
      await this.props.addOrder(this.props.user.id)
      this.props.addId(this.props.user.id, {
        orderId: this.props.order.id
      })
    }
  }

  render() {
    if (this.state.complete) {
      return <h1>Purchase Complete</h1>
    }

    return (
      <div className="checkout">
        <AddressForm />
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button type="submit" onClick={this.submit}>
          Purchase
        </button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    order: state.orders,
    cart: state.cart
  }
}

const mapDispatch = dispatch => {
  return {
    addOrder: userId => {
      return dispatch(addOrder(userId))
    },
    fetchOrder: userId => {
      dispatch(fetchOrder(userId))
    },
    addId: (userId, cartObj) => {
      dispatch(addId(userId, cartObj))
    }
  }
}

export default connect(mapState, mapDispatch)(injectStripe(StripeCheckout))
