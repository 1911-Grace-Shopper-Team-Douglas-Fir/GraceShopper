import axios from "axios";

// Action creator
const SET_CART = 'SET_CART';

export const setCart = (cart) => {
    return {
        type: SET_CART,
        cart: cart
    }
}

// Thunk Middleware
export const fetchCart = () => {
    return async (dispatch) => {
        try {
            const response = await axios.get('/api/cart')
            dispatch(setCart(response.data))
        }
        catch (err) {
            console.log(err)
        }
    }
}

// Reducer
const cartReducer = (state = [], action) => {
    switch (action.type) {
        case SET_CART:
            return [...action.cart]
        default:
            return state
    }
}


export default cartReducer
