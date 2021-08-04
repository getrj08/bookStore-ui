import React, { useEffect } from 'react'
import { connect } from "react-redux"
import { Card, CardContent, CardMedia, Button, Typography, Container, Grid, CardHeader, CssBaseline } from '@material-ui/core';
import { getAllBooks } from '../actions/bookActions';
import { addToCart } from '../actions/cartActions';
import useBookStyles from './styles/bookStyle'
  
const BookComponent = (props) => {
    const classes = useBookStyles();
    const ADD_TO_CART = "ADD TO CART"

    useEffect(() => {
        props.getAllBooks()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleAddToCart = (e,bookId) => {
        props.addToCart(bookId)
    }

    var bookList = []
    if(props.searchKeyword) {
        bookList = props.searchedBooks
    } else {
        bookList = props.books
    }

    return (
    <Container className={classes.rootContainer} maxWidth="md">
        <CssBaseline />
        <Grid container spacing={4}>
            {bookList.map((book) => (
                <Grid item key={book.isbn} xs={12} sm={6} md={4}>
                    <Card className={classes.rootCard} variant="outlined">
                        <CardHeader className={classes.rootHeader} title={book.title} />
                        <CardMedia className={classes.media}
                            image={book.thumbnailUrl}
                        />
                        <CardContent>
                            <Typography variant="body2" color="textSecondary" component="p">
                                {book.shortDescription}
                            </Typography>
                            <Typography variant="h6" style={{margin:'auto',textAlign : 'center'}} color='textPrimary'>
                                Buy @{book.price}
                            </Typography>
                            
                        </CardContent>
                        
                    </Card>
                    <Button onClick={(e) => {handleAddToCart(e,e.currentTarget.value)}} 
                            value={book.isbn} 
                            className={classes.rootButton} 
                            variant="contained" 
                            color="primary"
                            style={{marginLeft:'80px'}}>
                        {ADD_TO_CART}
                    </Button>
                </Grid>
            ))}
        </Grid>
    </Container>
    );
  }

  function mapStateToProps(state) {
    return {
        books : state.booksData.books,
        cartItems : state.cartData.cartItems,
        searchKeyword : state.booksData.searchKeyword,
        searchedBooks : state.booksData.searchedBooks
    }
}

export default connect(mapStateToProps, {getAllBooks,addToCart})(BookComponent)