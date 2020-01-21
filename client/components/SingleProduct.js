import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'
import {addProduct} from '../store/cart'

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

  handleSubmit(event) {
    event.preventDefault()
    let productToAdd = this.props.user.id
      ? {
          userId: this.props.user.id,
          quantity: this.state.quantity,
          productId: this.props.singleProduct.id
        }
      : {
          sessionId: this.props.user.sid,
          quantity: this.state.quantity,
          productId: this.props.singleProduct.id
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
          Quantity{' '}
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit} type="submit">
            {`$${(product.price / 100).toFixed(2)}`} - Add to Cart
          </button>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId)),
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
