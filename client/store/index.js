import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import cartReducer from './cart'
import singleProductReducer from './singleProduct'
import productsReducer from './allProducts'


try {
  dangerousThing()
}
catch (error){
  console.error(error);
  // axios.post('errortrackerproduct.io/track', error)
  dispatch(createErrorAction(error);
}

function createErrorAction (error) {
  return { type: "ERROR", error }
}

function errorReducer (state=null, action) {
  switch (action.type) {
    case "ERROR":
      return action.error
    default: return state
  }
}

const reducer = combineReducers({
  user: user,
  error: errorReducer,
  cart: cartReducer,
  singleProduct: singleProductReducer,
  allProducts: productsReducer
})

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
