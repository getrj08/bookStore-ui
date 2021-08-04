import { ADD_TO_CART, CLEAR_CART, DELETE_FROM_CART } from "../constants/types"
import axios from 'axios'

export const addToCart = (bookId) => dispatch => {
   dispatch({
        type : ADD_TO_CART,
        payload : bookId
    })
}

export const getItemsForCart = (bookIds) => async dispatch => {
    try {
        
        var res = await axios.post(
            "http://localhost:8080/books/getIds" , bookIds
        )
        
        return res.data //did not put in store because it is related to cart component only. and store already
        //has cart item which are ids this return the book object
    } catch (err) {
        console.log(err)
    }
}

export const clearCartItem = (bookId) => dispatch => {

    dispatch({
        type : DELETE_FROM_CART,
        payload : bookId
    })
}

export const clearCart = () => dispatch => {
    dispatch({
        type : CLEAR_CART
    })
}

export const placeOrder = (orders) => async dispatch => {
    try {
        const res = await axios.put(
            'http://localhost:8080/books/order',orders
        )

        return res.data
    } catch(err) {
        console.log(err);
    }
}