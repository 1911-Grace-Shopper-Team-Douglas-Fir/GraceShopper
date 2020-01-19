import React, {Component} from 'react'
import {connect} from 'react-redux'
import {CardElement, injectStripe} from 'react-stripe-elements'
import axios from 'axios'
import AddressForm from './AddressForm'
import {addOrder} from '../store/orders'

class StripeCheckout extends Component {
  constructor(props) {
    super(props)
    this.state = {complete: false}
    this.submit = this.submit.bind(this)
  }

  async submit(ev) {
    let {token} = await this.props.stripe.createToken({name: 'Name'})
    let response = await axios.post('/api/checkout', token)

    if (response.data.status === 'succeeded') this.setState({complete: true})

    if (response.data.status === 'succeeded') {
      this.props.addOrder(this.props.user.id)
    }
  }

  render() {
    if (this.state.complete) return <h1>Purchase Complete</h1>

    return (
      <div className="checkout">
        <AddressForm />
        <p>Would you like to complete the purchase?</p>
        <CardElement />
        <button onClick={this.submit}>Purchase</button>
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    addOrder: userId => {
      dispatch(addOrder(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(injectStripe(StripeCheckout))
