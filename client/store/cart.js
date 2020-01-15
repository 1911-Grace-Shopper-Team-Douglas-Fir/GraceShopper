import axios from 'axios'

// Action creator
const SET_CART = 'SET_CART'
const UPDATE_CART = 'UPDATE_CART'

export const setCart = cart => {
  return {
    type: SET_CART,
    cart: cart
  }
}

export const editCart = cartItem => {
  return {
    type: UPDATE_CART,
    cartItem
  }
}

// Thunk Middleware
export const fetchCart = userId => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/cart/${userId}`)
      dispatch(setCart(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const updateCart = (userId, cartObj) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/cart/${userId}`, cartObj)
      dispatch(editCart(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return [...action.cart]
    case UPDATE_CART:
      return [...action.cartItem]
    default:
      return state
  }
}

export default cartReducer
