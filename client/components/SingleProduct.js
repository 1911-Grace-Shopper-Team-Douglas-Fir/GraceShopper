import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addProduct} from '../store/cart'
import Reviews from './Reviews'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      quantity: 1
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    this.props.fetchSingleProduct(this.props.match.params.productId)
  }

  handleSubmit(event, price) {
    event.preventDefault()
    let productToAdd = this.props.user.id
      ? {
          userId: this.props.user.id,
          quantity: this.state.quantity,
          productId: this.props.singleProduct.id,
          price
        }
      : {
          sessionId: this.props.user.sid,
          quantity: this.state.quantity,
          productId: this.props.singleProduct.id,
          price
        }
    this.props.addProduct(productToAdd)
    event.target.innerText = 'added to cart'
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const product = this.props.singleProduct
    console.log('in SingleProduct', this.props)

    return (
      <div className="single-product-container">
        <img src={product.imageUrl} />
        <div className="product-info">
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <div className="product-info-sub-container">
            <div className="quantity">
              <p>Quantity</p>
              <input
                type="number"
                name="quantity"
                value={this.state.quantity}
                onChange={this.handleChange}
              />
            </div>
            <button
              onClick={e => this.handleSubmit(e, product.price)}
              type="submit"
            >
              {`$${(product.price / 100).toFixed(2)}`} - Add to Cart
            </button>
            <Reviews />
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
