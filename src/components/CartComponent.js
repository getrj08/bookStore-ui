import { useEffect,useState } from "react"
import { connect } from 'react-redux'
import { getItemsForCart, clearCartItem, clearCart, placeOrder} from '../actions/cartActions'
import { Modal,Table, Button } from 'react-bootstrap'
import { Typography } from "@material-ui/core"
import './styles/cartComponent.css'

const CartComponent = (props) => {

    const [selectedItems,setSelectedItems] = useState([])
    const [show,setShow] = useState(false)
    const [total,setTotal] = useState(0)
    const [totalItem, setTotalItem] = useState(0);
    const [showConfirmOrder,setShowConfirmOrder] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [orderId,setOrderId] = useState('')
    const [itemsPlaced,setItemsPlaced] = useState([])

    useEffect(() => {
        async function getItems() {
            const selectedData = await props.getItemsForCart(props.data.cartItems)
            setSelectedItems(selectedData.books)
            setTotal(selectedData.total);
            setTotalItem(selectedData.totalItem)
            setShow(true)
        } 
        
        getItems()
    },[]) // eslint-disable-line react-hooks/exhaustive-deps

    const handleClose       = () => {
        var cardContainer = document.getElementById('cardModalComponent')
        if(cardContainer) {
            cardContainer.remove()
        }
        setShow(false)
    };
    const closeSuccessAlert = () => setShowAlert(false)
    const closeConfirmOrder = () => setShowConfirmOrder(false)

    function handleItemCount(e , type) {
        var idToHandle = e.target.value;
        for(var i=0;i<selectedItems.length;i++) {
            var item = selectedItems[i];
            if(item.isbn === idToHandle) {
                if(type === 'increment') {
                    item.count = item.count + 1;
                    var addTotal = total + item.price;
                    var totalItemCount = totalItem + 1;
                    setTotal(addTotal)
                    setTotalItem(totalItemCount)
                    break
                } else {
                    item.count = item.count - 1;
                    if(item.count === 0) {
                     var nTotal = total-item.price; 
                     selectedItems.splice(i , 1)
                     props.clearCartItem(item.isbn)
                     setTotal(nTotal)
                    } else {
                        var newTotal = total - item.price;
                        setTotal(newTotal)
                    }
                    var decreItemCount = totalItem - 1;
                    setTotalItem(decreItemCount) 
                    break;
                }
            } else {
                continue
            }
            
        }

    }

    function handleClearCart() {
        setSelectedItems([])
        setTotalItem(0)
        setTotal(0)
        handleClose()
        props.clearCart()
    }

    async function handleOrderPlaced() {
       var placedItemsList = []
        for(let i=0;i<selectedItems.length;i++){
            var item = selectedItems[i]
                let placedItems = {
                    id : item.isbn,
                    count : item.count
                }
                placedItemsList.push(placedItems)
        }
            
       setItemsPlaced(placedItemsList)
       setShowConfirmOrder(true)
       handleClose()
       
    }

    async function handleConfirmOrder() {
        console.log('items in confirm order')
        console.log(itemsPlaced)
        var orderResponse = await props.placeOrder(itemsPlaced)
        setOrderId(orderResponse)
        handleClearCart()
        closeConfirmOrder()
        setShowAlert(true)
    }

    function handleConfirmOrderDialog() {
        return (
            <Modal show={showConfirmOrder} 
                onHide={closeConfirmOrder} 
                centered
                >
                    <Modal.Header>
                        <Modal.Title>Confirm Order</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Typography variant="h6">
                            Order Total : {total}
                        </Typography>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={handleConfirmOrder}>
                            Confirm
                        </Button>
                        <Button variant="danger" onClick={closeConfirmOrder}>
                            Close
                        </Button>
                    </Modal.Footer>
            </Modal>
        )

    }

    function handleOrderAlert() {
        return (
            <Modal show={showAlert} onHide={closeSuccessAlert} centered>
                <Modal.Header>
                    <Modal.Title>Order Placed Successfully</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Typography variant="subtitle1">
                        Order ID : {orderId}
                    </Typography>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={closeSuccessAlert}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        )

    }
   
    var itemCount = 1;
    return (
        <>
            {handleOrderAlert()}
            {handleConfirmOrderDialog()}
            <Modal size='lg' show={show} onHide={handleClose} centered>
                    <Modal.Title style={{marginTop:'10px' , width:'50%', textAlign : 'end'}}
                                        >Items Selected</Modal.Title>
                    <Modal.Body>
                        <Table >
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>title</th>
                                    <th>price per book</th>
                                    <th>total price of book</th>
                                    <th>count</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedItems.map(item => (
                                    
                                    <tr key={item.isbn}>
                                        <td>{itemCount++}</td>
                                        <td>{item.title}</td>
                                        <td>{item.price}</td>
                                        <td>{item.count*item.price}</td>
                                        <td>
                                            <Button 
                                                onClick={(e) => handleItemCount(e, "increment")} 
                                                value={item.isbn} 
                                                style={{height:'30px' , width:'10px'}}>
                                                    +
                                            </Button>
                                            {' '}{item.count}
                                            {' '}<Button 
                                                onClick={(e) => handleItemCount(e)} 
                                                value={item.isbn} 
                                                style={{height:'30px' , width:'10px'}}>
                                                    -
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td></td>
                                    <td><Typography variant='h6'>Total</Typography></td>
                                    <td></td>
                                    <td><Typography variant='h6'>{total}</Typography></td>
                                    <td><Typography variant='h6'>{totalItem}</Typography></td>
                                </tr>
                            </tbody>
                        </Table>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="success" onClick={() => handleOrderPlaced()}>Place Order</Button>
                        <Button variant="danger" onClick={() => handleClearCart()}>Clear Cart</Button>
                    </Modal.Footer>
                </Modal>
        </>
    )
}

export default connect(null , {getItemsForCart,clearCartItem,clearCart,placeOrder})(CartComponent)