import React , {useState} from 'react'
import ReactDOM from 'react-dom'
import { AppBar, Button, Toolbar, Typography } from "@material-ui/core"
import libraryLogo from '../images/library.png'
import {Modal, Form , FormControl} from 'react-bootstrap'
import { searchBooks } from '../actions/bookActions'
import { connect, Provider } from "react-redux"
import CartComponent from "./CartComponent"
import store from '../store'


const HeaderComponent = (props) => {

    const [showAlert, setShowAlert] = useState(false)

    function closeEmptyCartAlert() {
        setShowAlert(false)
    }

    const handleEmptyCart = () => {
        return (
                <Modal size='md' show={showAlert} onHide={closeEmptyCartAlert} centered>
                    <Modal.Title style={{margin:'10px' , 
                                        backgroundColor : 'floralWhite'}}
                                        >Please select items for Cart !!</Modal.Title>
                </Modal>
        )
    }

    function handleCheckoutAction() {
       if(props.cartItems.length === 0) {
           console.log('empty cart')
           setShowAlert(true)
       } else {
           var crdContainer = document.createElement('div')
           crdContainer.setAttribute('id','cardModalComponent')
           document.body.appendChild(crdContainer)
           ReactDOM.render(
                <Provider store={store}>
                    <CartComponent data={props} />
                </Provider>
                
           , crdContainer)
       }
    }

    function handleBookSearch(e) {
        if(e.key === 'Enter') {
            props.searchBooks(e.target.value)
            e.preventDefault()
        }

        
    }

    return (
        
        <>
            {handleEmptyCart()}
            <AppBar position='relative'>
                <Toolbar>
                <img
                    alt=""
                    src={libraryLogo}
                    width="60"
                    height="50"
                    className="d-inline-block align-top"
                />{' '}
                <Typography style={{marginLeft : '20px'}}>
                    Welcome, To your Digital Library
                </Typography>
                <Form inline>
                    <FormControl style={{marginLeft : '20px'}} 
                    type="text" 
                    placeholder="Search" 
                    className="mr-sm-2" 
                    onKeyPress={(e) => {handleBookSearch(e)}} />
                </Form>
                <Button style={{backgroundColor : 'green' , marginLeft : 'auto'}} 
                    variant="contained" color="primary" 
                    onClick={handleCheckoutAction}>
                    Checkout ({props.cartItems.length})
                </Button>
                </Toolbar>
            </AppBar>
        </>
    )
}

function mapStateToProps(state) {
    return {
        cartItems : state.cartData.cartItems
    }
}

export default connect(mapStateToProps, {searchBooks})(HeaderComponent)