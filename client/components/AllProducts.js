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
        {products &&
          products.map(product => (
            <div
              className="product-card"
              style={{
                backgroundImage: `url(${product.imageUrl})`,
                backgroundSize: 250,
                backgroundRepeat: 'no-repeat'
              }}
              key={product.id}
            >
              {/* <img className="product-img" src={product.imageUrl} /> */}
              <p className="product-card-title">{product.name}</p>
              <button
                className="product-card-add-btn"
                id={product.id}
                type="submit"
                onClick={this.handleSubmit}
              >
                {`$${(product.price / 100).toFixed(2)}`} - Add to Cart
              </button>
            </div>
          ))}
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
