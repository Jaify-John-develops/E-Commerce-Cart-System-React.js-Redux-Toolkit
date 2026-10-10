import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/CartSlice';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.title} />
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>${item.price} each</p>
                </div>
                <div className="quantity-controls">
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>-</button>
                  <span>{item.quantity}</span>
                  <button onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <button className="remove-btn" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${totalAmount}</h3>
            <button className="clear-btn" onClick={() => dispatch(clearCart())}>Clear Cart</button>
          </div>
        </>
      )}
    </div>
  );
}
