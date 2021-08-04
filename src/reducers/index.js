import { combineReducers} from 'redux'
import booksReducer from './booksReducer'
import cartReducer from './cartReducer'

export default combineReducers({
    booksData : booksReducer,
    cartData : cartReducer
})
