import React from 'react'
import {connect} from 'react-redux'
// import {Link} from 'react-router-dom'
import {fetchCart} from '../store/cart'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    this.props.setCart()
  }

  handleChange = evt => {
    // let newQty = evt.target.value
    evt.target.name === 'quantity' && console.log(this.state)
    //   ? this.state.forEach(item => {
    //       if (item.id === evt.trget.id) {
    //         console.log('before change', item)
    //         item.quantity = newQty
    //         console.log('after change', item)
    //       }
    //     })
  }

  render() {
    return (
      <React.Fragment>
        {this.props.cart ? (
          <div>
            <h1>Shopping Cart</h1>
            <div>
              <h3>Product</h3>
              <h3>Quantity</h3>
              <h3>Price</h3>
            </div>
            <div>
              {this.props.cart.map(item => (
                <div key={item.id}>
                  <img src={item.product.imageUrl} width="200px" />
                  <h4>{item.product.name}</h4>
                  <form>
                    <input
                      type="text"
                      name="quantity"
                      id={item.id}
                      defaultValue={item.quantity}
                      onChange={this.handleChange}
                    />
                    <button type="submit">Update</button>
                  </form>
                  <p>{`$${(item.product.price / 100).toFixed(2)}`}</p>
                </div>
              ))}
            </div>
            {console.log('cart', this.props.cart)}
          </div>
        ) : (
          <div>
            <h1>There are no items in the cart</h1>
          </div>
        )}
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart
  }
}

const mapDispatch = (dispatch, ownProps) => {
  return {
    setCart: () => {
      const userId = ownProps.match.params.userId
      dispatch(fetchCart(userId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
