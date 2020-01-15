import React from 'react'
import {connect} from 'react-redux'
import {fetchSingleProduct} from '../store/singleProduct'

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
    this.setState({
      quantity: 1
    })
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }
}

const mapState = state => {
  return {
    singleProduct: state.singleProduct
  }
}

const mapDispatch = dispatch => {
  return {
    fetchSingleProduct: productId => dispatch(fetchSingleProduct(productId))
  }
}

export default connect(mapState, mapDispatch)(SingleProduct)
