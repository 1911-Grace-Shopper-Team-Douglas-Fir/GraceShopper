import axios from 'axios'

const CREATE_ORDER = 'CREATE_ORDER'

export const createOrder = order => {
  return {
    type: CREATE_ORDER,
    order
  }
}

export const addOrder = order => {
  return async dispatch => {
    try {
      const response = await axios.post('/api/orders', order)
      dispatch(createOrder(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

const ordersReducer = (state = [], action) => {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order
    default:
      return state
  }
}

export default ordersReducer
