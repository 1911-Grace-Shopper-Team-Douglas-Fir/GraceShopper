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
  render() {
    const product = this.props.singleProduct
    console.log('in SingleProduct', this.props)

    return (
      <div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <img src={product.imageUrl} />
        <form onSubmit={this.handleSubmit}>
          Quantity{' '}
          <input
            type="text"
            name="quantity"
            value={this.state.quantity}
            onChange={this.handleChange}
          />
          <button type="submit">
            {`$${(product.price / 100).toFixed(2)}`} - Add to Cart
          </button>
        </form>
      </div>
    )
  }
  handleSubmit(event) {
    event.preventDefault()
    const productToAdd = {
      quantity: this.state.quantity,
      productId: this.props.singleProduct.id,
      userId: this.props.user.id
    }
    this.props.addProduct(productToAdd)
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
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
