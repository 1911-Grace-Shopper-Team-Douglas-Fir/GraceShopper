import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    const products = this.props.products

    return (
      <div>
        <ul>
          Hello World
          {products &&
            products.map(product => (
              <div>
                <div>{product.name}</div>
                <div>{product.description}</div>
                <div>{product.price}</div>
                <div>{product.imageUrl}</div>
                <div>{product.category}</div>
              </div>
            ))}
        </ul>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
