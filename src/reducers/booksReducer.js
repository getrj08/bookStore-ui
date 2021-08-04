
import { GET_BOOKS , DELETE_BOOK, SEARCH_BOOKS } from "../constants/types"

const initialState = {
    books : []
}

const booksReducer = (state = initialState , action) => {

    switch(action.type) {
        case GET_BOOKS : 
            console.log('in get books for books reducer')
            console.log(action.payload)
            let getbooks = action.payload
            return {
                ...state , 
                books : getbooks
            }
        case DELETE_BOOK :
            let deletedBookId = action.payload ; // id of deleted book
            const updatedBooks = state.books.filter(function(b) {
                return b.id !== deletedBookId
            }) 
            state.books = updatedBooks
            return state
        case SEARCH_BOOKS : 
            let searchKeyword = action.payload;
            let allBooks = state.books;
            let searchedBooks = []
            for(let i = 0;i<allBooks.length;i++) {
                var book = allBooks[i]
                if(book.title.toLowerCase().includes(searchKeyword)) {
                    searchedBooks.push(book)
                }
            }
            return {
                ...state,
                searchedBooks : searchedBooks,
                searchKeyword : searchKeyword
            }
            
        default : return state
    }

}



export default booksReducer
