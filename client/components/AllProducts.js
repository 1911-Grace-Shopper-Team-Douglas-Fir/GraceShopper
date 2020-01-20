import React from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {fetchProducts} from '../store/allProducts'
import {addProduct} from '../store/cart'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      productsPerPage: 10,
      search: ''
    }
    this.handleClick = this.handleClick.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.updateSearch = this.updateSearch.bind(this)
  }

  updateSearch(event) {
    this.setState({search: event.target.value.substr(0, 20)})
    this.setState({
      currentPage: 1
    })
  }

  componentDidMount() {
    this.props.fetchProducts()
  }

  handleClick(event) {
    this.setState({
      currentPage: Number(event.target.id)
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    let productToAdd = this.props.user.id
      ? {userId: this.props.user.id, quantity: 1, productId: event.target.id}
      : {
          sessionId: this.props.user.sid,
          quantity: 1,
          productId: event.target.id
        }
    this.props.addProduct(productToAdd)
  }

  render() {
    const {currentPage, productsPerPage} = this.state
    const productCatalog = this.props.products

    // Logic for displaying products
    const indexOfLastProduct = currentPage * productsPerPage
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage
    const searchedProducts = productCatalog.filter(product => {
      return (
        product.name.toLowerCase().indexOf(this.state.search.toLowerCase()) !==
        -1
      )
    })
    const currentProducts = searchedProducts.slice(
      indexOfFirstProduct,
      indexOfLastProduct
    )

    // Logic for displaying page numbers
    const pageNumbers = []
    for (
      let i = 1;
      i <= Math.ceil(productCatalog.length / productsPerPage);
      i++
    ) {
      pageNumbers.push(i)
    }
    let dynamicPages = pageNumbers.slice(
      0,
      Math.ceil(searchedProducts.length / productsPerPage)
    )

    // React JSX rendering
    return (
      <div>
        <input
          type="text"
          value={this.state.search}
          onChange={this.updateSearch}
        />
        <div className="product-container">
          {currentProducts.map((product, index) => {
            return (
              <Link to={`/products/${product.id}`}>
                <div
                  className="product-card"
                  style={{
                    backgroundImage: `url(${product.imageUrl})`,
                    backgroundSize: 200,
                    backgroundRepeat: 'no-repeat'
                  }}
                  key={product.id}
                >
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
              </Link>
            )
          })}
        </div>
        <div className="page-numbers-list" id="page-numbers">
          {dynamicPages.map(number => {
            return (
              <div
                className="page-numbers"
                key={number}
                id={number}
                onClick={this.handleClick}
              >
                {' '}
                {number}{' '}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.allProducts,
    user: state.user,
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(fetchProducts()),
    addProduct: product => dispatch(addProduct(product))
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
