
import { ADD_TO_CART, CLEAR_CART, DELETE_FROM_CART } from "../constants/types"

const initialState = {
    cartItems : []
}

const cartReducer = (state = initialState , action) => {

    switch(action.type) {
        case ADD_TO_CART : 
            let addIdToCart = action.payload
            
            console.log('ids in  cart reducer')
            console.log(state)
            console.log(addIdToCart) // this should be replace with action payload from api
            let cartState = {
                ...state , 
                cartItems : [...state.cartItems,addIdToCart]
            }
            console.log(cartState)
            return cartState
        case DELETE_FROM_CART :
            let deletedCartId = action.payload ; // id of deleted book
            console.log('deleting from cart')
            const updatedCart = state.cartItems.filter(function(id) {
                return id !== deletedCartId
            }) 
            let cState = {
                ...state , 
                cartItems : updatedCart
            }
            return cState
        case CLEAR_CART :
                let clearedCart = []
                return {
                    ...state,
                    cartItems : clearedCart
                }
        default : return state
    }

}



export default cartReducer