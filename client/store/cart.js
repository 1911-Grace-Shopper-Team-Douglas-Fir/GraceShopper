import axios from 'axios'

// Action creator
const SET_CART = 'SET_CART'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'

export const setCart = cart => {
  return {
    type: SET_CART,
    cart: cart
  }
}

export const addCartItem = item => {
  return {
    type: ADD_CART_ITEM,
    item
  }
}

export const removeItem = productId => {
  return {
    type: DELETE_CART_ITEM,
    productId
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
      // /api/cart/:userId
      // /api/users/:userId/cart
      const response = await axios.put(`/api/cart/${userId}`, cartObj)
      dispatch(setCart(response.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addProduct = product => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/cart', product)
      dispatch(addCartItem(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

export const deleteItem = productId => {
  return async dispatch => {
    try {
      await axios.delete(`/api/cart/${productId}`)
      dispatch(removeItem(productId))
    } catch (error) {
      console.log(error)
    }
  }
}

// Reducer
const cartReducer = (state = [], action) => {
  switch (action.type) {
    case SET_CART:
      return action.cart
    case ADD_CART_ITEM:
      return [...state, action.item]
    case DELETE_CART_ITEM:
      return state.filter(product => product.productId !== action.productId)
    default:
      return state
  }
}

export default cartReducer
