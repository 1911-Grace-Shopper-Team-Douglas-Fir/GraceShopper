import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

export default class TakeMoney extends React.Component {
  onToken = token => {
    console.log(token)
    fetch('/api/checkout', {
      method: 'POST',
      body: token.id
    }).then(response => {
      response.json().then(data => {
        alert(`We are in business, ${data.email}`)
      })
    })
  }

  render() {
    return (
      <StripeCheckout
        stripeKey="pk_test_rBtS5vEbOXpVeH6RKMXFgm8t00RVtMxmZE"
        token={this.onToken}
        amount={1}
      />
    )
  }
}
