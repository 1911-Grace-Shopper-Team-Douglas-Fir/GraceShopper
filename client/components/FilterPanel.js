import React from 'react'
import {connect} from 'react-redux'
import {filterProducts, fetchProducts} from '../store/allProducts'

class FilterPanel extends React.Component {
  handleClick = evt => {
    const type = evt.target.name
    if (type === 'all') {
      this.props.fetchProducts()
    } else {
      this.props.filterProducts(type)
    }
  }

  render() {
    return (
      <div>
        <div>
          <h2>Product Type</h2>
          <button name="face" onClick={this.handleClick}>
            Skincare
          </button>
          <button name="body" onClick={this.handleClick}>
            Body
          </button>
          <button name="home" onClick={this.handleClick}>
            Home
          </button>
          <button name="all" onClick={this.handleClick}>
            Shop All
          </button>
        </div>
        <div>
          <h2>Filter</h2>
          <button name="price" onClick={this.handleClick}>
            Price $-$$$
          </button>
          <button name="name" onClick={this.handleClick}>
            Product A-Z
          </button>
        </div>
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
    filterProducts: type => dispatch(filterProducts(type)),
    fetchProducts: () => dispatch(fetchProducts())
  }
}

export default connect(mapState, mapDispatch)(FilterPanel)
