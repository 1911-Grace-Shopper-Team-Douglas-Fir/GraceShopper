import React from 'react'
import {connect} from 'react-redux'
import {fetchCart, updateCart, deleteItem} from '../store/cart'
import {Link} from 'react-router-dom'
import {FiDelete} from 'react-icons/fi'

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
      <div id="cart-outer">
        {this.props.cart ? (
          <>
            <div id="cart-view-container">
              <div id="cart-sub-left">
                <h1>Shopping Cart</h1>
              </div>
              <div id="cart-sub-right">
                <div id="cart-item-titles">
                  <h3>Product</h3>
                  <h3>Quantity</h3>
                  <h3>Price</h3>
                </div>
                <div>
                  {this.props.cart.map(item => (
                    <div className="cart-item" key={item.id}>
                      <div className="cart-item-product-name">
                        <img src={item.product.imageUrl} width="200px" />
                        <p className="cart-item-name">{item.product.name}</p>
                        <FiDelete
                          onClick={() => this.handleDelete(item.productId)}
                          name="delete"
                        />
                      </div>
                      <form onSubmit={this.handleSubmitQty}>
                        <input
                          type="number"
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
              </div>
            </div>
            <div id="cart-checkout">
              <p>Order Total: {`$${(total / 100).toFixed(2)}`}</p>
              <Link to="/checkout">
                <button name="checkout">CHECKOUT</button>
              </Link>
            </div>
          </>
        ) : (
          <div>
            <h1>There are no items in the cart</h1>
          </div>
        )}
      </div>
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
