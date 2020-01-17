import axios from 'axios'

// Action creator
const SET_PRODUCTS = 'SET_PRODUCTS'

export const setProducts = products => {
  return {
    type: SET_PRODUCTS,
    products: products
  }
}

// Thunk Middleware
export const fetchProducts = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/products')
      dispatch(setProducts(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer
const productsReducer = (state = [], action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products
    default:
      return state
  }
}

export default productsReducer
