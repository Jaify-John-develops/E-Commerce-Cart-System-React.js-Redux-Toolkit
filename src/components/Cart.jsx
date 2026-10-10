import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity, clearCart } from '../features/cart/CartSlice';

export default function Cart() {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);

  return (
    <aside className="cart-container">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SELECTION</p>
          <h2>Your bag</h2>
        </div>
        <span className="cart-count">{cartItems.reduce((count, item) => count + item.quantity, 0)}</span>
      </div>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <span className="empty-cart-icon" aria-hidden="true">🛍️</span>
          <h3>Your bag is taking a little break</h3>
          <p>Add something lovely from the collection and it will show up here.</p>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-image-wrap"><img src={item.image} alt="" /></div>
                <div className="item-details">
                  <h4>{item.title}</h4>
                  <p>${Number(item.price).toFixed(2)} each</p>
                </div>
                <div className="quantity-controls">
                  <button aria-label={`Decrease quantity of ${item.title}`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}>−</button>
                  <span>{item.quantity}</span>
                  <button aria-label={`Increase quantity of ${item.title}`} onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}>+</button>
                </div>
                <button className="remove-btn" aria-label={`Remove ${item.title} from cart`} onClick={() => dispatch(removeFromCart(item.id))}>×</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <div className="subtotal-row"><span>Subtotal</span><strong>${totalAmount}</strong></div>
            <p className="shipping-note">Shipping and taxes calculated at checkout.</p>
            <button className="clear-btn" onClick={() => dispatch(clearCart())}>Clear bag</button>
          </div>
        </>
      )}
    </aside>
  );
}
