import axios from 'axios'

// Action creator
const GET_USER_ORDER = 'GET_USER_ORDER'

export const getUserOrder = order => {
  return {
    type: GET_USER_ORDER,
    order
  }
}

// Thunk Middleware
export const getOrder = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/users/myprofile')
      dispatch(getUserOrder(response.data))
    } catch (err) {
      console.log(err)
    }
  }
}

// Reducer
const userOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_USER_ORDER:
      return action.order
    default:
      return state
  }
}

export default userOrderReducer
