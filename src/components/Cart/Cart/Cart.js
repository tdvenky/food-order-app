import React, { useContext, useState } from 'react';

import useAxios from '../../../hooks/useAxios';

import Modal from '../../UI/Modal/Modal';
import CartContext from '../../../store/cart-context';
import CartItem from './CartItem/CartItem';
import Checkout from '../Checkout/Checkout';

import classes from './Cart.module.css';

const Cart = (props) => {
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
    const [orderId, setOrderID] = useState(null);

    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const {sendRequest: postOrder} = useAxios();

    const cartItemRemoveHandler = (id) => {
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        cartCtx.addItem({
            ...item,
            amount: 1
        });
    };

    const cartClearHandler = () => {
        cartCtx.clearCart();
    }

    const orderHandler = () => {
        setIsCheckout(true);
    }

    const submitOrderHandler = async (userData) => {
        setIsSubmitting(true);

        await postOrder({
            url: process.env.REACT_APP_POST_ORDER_URL,
            method: 'POST',
            body: {
                user: userData,
                orderedItems: cartCtx.items
            }
        }, postOrderStatus);

        setIsSubmitting(false);
        setDidSubmit(true);
        cartClearHandler();
    };

    const postOrderStatus = (orderStatus) => {
        setOrderID(orderStatus.name);
    }

    const cartItems = (
        <ul className={classes['cart-items']}>
            { cartCtx.items.map(item => 
                <CartItem 
                    key={item.id} 
                    name={item.name} 
                    amount={item.amount} 
                    price={item.price}
                    onRemove={cartItemRemoveHandler.bind(null, item.id)}
                    onAdd={cartItemAddHandler.bind(null, item)}
                />
                ) 
            }
        </ul>
    );

    const modalActions = (
        <div className={classes.actions}>
            <button onClick={props.onHideCart} className={classes['button-alt']}>Close</button>
            { hasItems && <button className={classes.button} onClick={orderHandler}>Order</button> }
        </div>
    );

    const cartModalContent = (
        <React.Fragment>
            {cartItems}
            <div className={classes.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onConfirm={submitOrderHandler} onCancel={props.onHideCart}/>}
            {!isCheckout && modalActions}
        </React.Fragment>
    );

    const isSubmittingModalContent = (
        <p>Please wait while we are placing your order...</p>
    );

    const didSubmitModalContent = (
        <React.Fragment>
            <p>Your order has been placed successully, your order ID is {orderId}</p>
            <div className={classes.actions}>
            <button onClick={props.onHideCart} className={classes.button}>Close</button>
        </div>
        </React.Fragment>
    );

    return (
        <Modal onClick={props.onHideCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {!isSubmitting && didSubmit && didSubmitModalContent}
        </Modal>
    )
}

export default Cart;