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
      console.log('thunk')
      const response = await axios.get(`/api/products/${productId}`)
      dispatch(setSingleProduct(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const addReview = reviewObj => {
  return async dispatch => {
    try {
      const res = await axios.post(`/api/products/review`, reviewObj)
      console.log(res)
      dispatch(setSingleProduct(res.data))
    } catch (error) {
      console.log(error)
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
