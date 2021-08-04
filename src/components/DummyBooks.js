import { useEffect } from "react"
import { connect } from "react-redux"
import { getAllBooks } from "../actions/bookActions"

const DummyBooks = (props) => {

    useEffect(() => {
        props.getAllBooks()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    console.log(props)
    return (
    <>
        {props.books ? props.books.map((book) => (
            <div id={book.id}>
                <p>{book.title}</p>    
            </div>
        )) : null}
    </>
    )
}

function mapStateToProps(state) {
    console.log('mapping state in dummy books')
    console.log(state)
    return {
        books : state.booksData.books
    }
}

/*function mapDispatchToProps(dispatch) {
    console.log('mapping dispatch in dummy books')
    return {
        getAllBooks : () => {
            const res = getBooks();
            console.log(res) // replace this with axios call
            dispatch({
                type : "GET_BOOKS",
                payload : res
            })
        }
           
    }
}*/

export default connect(mapStateToProps, {getAllBooks}) (DummyBooks)