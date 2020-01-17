import axios from 'axios'

// Action creator
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT'

export const setSingleProduct = product => {
  return {
    type: SET_SINGLE_PRODUCT,
    product: product
  }
}

// Thunk Middleware
export const fetchSingleProduct = productId => {
  return async dispatch => {
    try {

      // /api/products/product
      //
      // /api/products/:id
      const response = await axios.get(`/api/products/product/${productId}`)
      dispatch(setSingleProduct(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer
const singleProductReducer = (state = {}, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product
    default:
      return state
  }
}

export default singleProductReducer
