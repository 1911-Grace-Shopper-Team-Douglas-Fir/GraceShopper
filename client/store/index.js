import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import cartReducer from './cart'
import singleProductReducer from './singleProduct'
import productsReducer from './allProducts'

const reducer = combineReducers({
  user: user,
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
