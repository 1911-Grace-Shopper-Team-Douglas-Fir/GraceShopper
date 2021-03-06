import axios from 'axios'

// Action creator
const SET_CART = 'SET_CART'
const UPDATE_CART = 'UPDATE_CART'
const ADD_CART_ITEM = 'ADD_CART_ITEM'
const DELETE_CART_ITEM = 'DELETE_CART_ITEM'
const ADD_ORDER_ID = 'ADD_ORDER_ID'

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

export const addOrderId = orderId => {
  return {
    type: ADD_ORDER_ID,
    orderId
  }
}
// Thunk Middleware
export const fetchCart = id => {
  return async dispatch => {
    try {
      const response = await axios.get(`/api/cart/${id}`)
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

export const addId = (userId, orderId) => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/orders/cart/${userId}`, orderId)
      dispatch(addOrderId(response.data))
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
    case UPDATE_CART:
      return [...action.cartItem]
    case ADD_CART_ITEM:
      return action.item
    case DELETE_CART_ITEM:
      return state.filter(product => product.productId !== action.productId)
    case ADD_ORDER_ID:
      return action.orderId
    default:
      return state
  }
}

export default cartReducer
