import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {addProduct} from '../store/cart'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleSubmit(event) {
    event.preventDefault()
    const productToAdd = {
      quantity: 1,
      productId: event.target.id,
      ...(this.props.user.id && {userId: this.props.user.id}),
      ...(this.props.user.sid && {sessionId: this.props.user.sid})
    }
    this.props.addProduct(productToAdd)
  }

  render() {
    const products = this.props.products
    return (
      <div>
        <ul>
          {products &&
            products.map(product => (
              <div className="product-container" key={product.id}>
                <h1>{product.name}</h1>
                <p>{product.description}</p>
                <button
                  id={product.id}
                  type="submit"
                  onClick={this.handleSubmit}
                >
                  {`$${(product.price / 100).toFixed(2)}`} - Add to Cart
                </button>
                <h2>{product.category}</h2>
                <img src={product.imageUrl} />
              </div>
            ))}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
