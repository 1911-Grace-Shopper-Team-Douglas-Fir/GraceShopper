import React, {Component} from 'react'
import {Elements, StripeProvider} from 'react-stripe-elements'
import StripeCheckout from './StripeCheckout'

class Checkout extends Component {
  render() {
    return (
      <StripeProvider apiKey="pk_test_rBtS5vEbOXpVeH6RKMXFgm8t00RVtMxmZE">
        <div className="example">
          <h1>Checkout</h1>
          <Elements>
            <StripeCheckout />
          </Elements>
        </div>
      </StripeProvider>
    )
  }
}

export default Checkout
