import React from 'react'
import {connect} from 'react-redux'
import {fetchProducts} from '../store/allProducts'
import {addProduct} from '../store/cart'

export class AllProducts extends React.Component {
  constructor() {
    super()
    this.state = {
      currentPage: 1,
      productsPerPage: 5,
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
    const productToAdd = {
      quantity: 1,
      productId: event.target.id,
      ...(this.props.user.id && {userId: this.props.user.id}),
      ...(this.props.user.sid && {sessionId: this.props.user.sid})
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
        <ul>
          {currentProducts.map((product, index) => {
            return (
              <div key={product.id}>
                <div className="product-container">
                  <h1>{product.name}</h1>
                  <p>{product.description}</p>
                  <button
                    id={product.id}
                    type="submit"
                    onClick={this.handleSubmit}
                  >
                    {' '}
                    {`$${(product.price / 100).toFixed(2)}`} - Add to Cart{' '}
                  </button>
                  <h2>{product.category}</h2>
                  <img src={product.imageUrl} />
                </div>
              </div>
            )
          })}
        </ul>
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

/*


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
               <img className="product-img" src={product.imageUrl} />
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




*/
