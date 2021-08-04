import { DELETE_BOOK, GET_BOOKS, SEARCH_BOOKS } from "../constants/types";
import axios from 'axios'



export const getAllBooks = () => async dispatch => {

    try {
        const response = await axios.get(
            "http://localhost:8080/books/all"
        )

        const res = response.data;
        dispatch({
            type : GET_BOOKS,
            payload : res
        })

    } catch(err) {
        console.log(err)
    }
}

export const getBooks  = () => async dispatch=> {

    try {
        const response = await axios.get(
            "http://localhost:8080/books/all"
        )

        const res = response.data;
        dispatch({
            type : GET_BOOKS,
            payload : res
        })

    } catch(err) {
        console.log(err)
    }
}


export const deleteBook = (id) => async dispatch => {

    try {
        //const res = await getBooks() ; // replace this with axios call
        dispatch({
            type : DELETE_BOOK,
            payload : id
        })

    } catch(err) {
        console.err(err)
    }
}

export const searchBooks = (keyword) => async dispatch => {
    try {
        dispatch({
            type : SEARCH_BOOKS,
            payload : keyword
        })
    } catch(err) {
        console.log(err)
    }
}