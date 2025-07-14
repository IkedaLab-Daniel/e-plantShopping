import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity, clearCart } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  const [showCheckout, setShowCheckout] = React.useState(false);
  const [checkoutSuccess, setCheckoutSuccess] = React.useState(false);


  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + item.quantity * parseFloat(item.cost.replace('$', '')), 0);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    setShowCheckout(true);
  };

  const handleConfirmCheckout = () => {
    dispatch(clearCart());
    setShowCheckout(false);
    setCheckoutSuccess(true);
    setTimeout(() => setCheckoutSuccess(false), 3000); // Hide after 3s
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return (item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2);
  };

  return (
      <div className="cart-container">
        <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount().toFixed(2)}</h2>
        {checkoutSuccess && (
          <div style={{ color: 'green', fontWeight: 'bold', marginBottom: '10px' }}>
            Checkout successful! Thank you for your purchase.
          </div>
        )}
        <div>
          <div>
            {cart.map(item => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-cost">Price: {item.cost}</div>
                  <div className="cart-item-quantity">
                    <button className="cart-item-button" onClick={() => handleDecrement(item)}>-</button>
                    <span className="cart-item-quantity-value">{item.quantity}</span>
                    <button className="cart-item-button" onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <div className="cart-item-total">Total: ${(item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2)}</div>
                  <button className="cart-item-delete" onClick={() => handleRemove(item)}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
        <div className="continue_shopping_btn">
          <button className="get-started-button" onClick={handleContinueShopping}>Continue Shopping</button>
          <br />
          <button
            className="get-started-button1"
            onClick={handleCheckout}
            disabled={cart.length === 0}
          >
            Checkout
          </button>
        </div>
        {showCheckout && (
          <div style={{
            position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
            background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000
          }}>
            <div style={{ background: 'white', padding: 30, borderRadius: 10, minWidth: 300, textAlign: 'center' }}>
              <h2>Order Summary</h2>
              <ul style={{ textAlign: 'left', marginBottom: 20 }}>
                {cart.map(item => (
                  <li key={item.name}>
                    {item.name} x {item.quantity} = ${(item.quantity * parseFloat(item.cost.replace('$', ''))).toFixed(2)}
                  </li>
                ))}
              </ul>
              <div style={{ marginBottom: 20, fontWeight: 'bold' }}>
                Total: ${calculateTotalAmount().toFixed(2)}
              </div>
              <button
                className="get-started-button1"
                onClick={handleConfirmCheckout}
                style={{ marginRight: 10 }}
              >
                Confirm Checkout
              </button>
              <button
                className="get-started-button"
                onClick={() => setShowCheckout(false)}
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    );
  };

export default CartItem;
