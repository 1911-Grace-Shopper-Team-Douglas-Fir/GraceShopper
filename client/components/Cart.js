import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, updateCart, deleteItem} from '../store/cart'
import {Link} from 'react-router-dom'

class Cart extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      id: null,
      quantity: null,
      userId: this.props.isLoggedIn ? this.props.user.id : this.props.user.sid
    }
  }

  componentDidMount() {
    this.props.setCart(this.state.userId)
  }

  handleChange = evt => {
    let newQty = evt.target.value
    const id = evt.target.id
    this.setState({id, quantity: newQty})
  }

  handleSubmitQty = evt => {
    evt.preventDefault()
    const updateObj = this.state
    this.props.updateQty(this.state.userId, updateObj)
  }

  handleDelete = productId => {
    this.props.deleteItem(productId)
  }

  render() {
    const length = this.props.cart.length
    let total = 0
    if (length) {
      for (let i = 0; i < length; i++) {
        let itemPrice = this.props.cart[i].price
        let quantity = this.props.cart[i].quantity
        total += itemPrice * quantity
      }
    }

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
                  <form onSubmit={this.handleSubmitQty}>
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
                  <button
                    onClick={() => this.handleDelete(item.productId)}
                    name="delete"
                  >
                    Delete
                  </button>
                </div>
              ))}
            </div>
            <div>
              <h2>Order Total: {`$${(total / 100).toFixed(2)}`}</h2>
            </div>
          </div>
        ) : (
          <div>
            <h1>There are no items in the cart</h1>
          </div>
        )}
        <Link to="/checkout">
          <button name="checkout">CHECKOUT</button>
        </Link>
      </React.Fragment>
    )
  }
}

const mapState = state => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    setCart: id => {
      dispatch(fetchCart(id))
    },
    updateQty: (userId, updateObj) => {
      dispatch(updateCart(userId, updateObj))
    },
    deleteItem: productId => {
      dispatch(deleteItem(productId))
    }
  }
}

export default connect(mapState, mapDispatch)(Cart)
