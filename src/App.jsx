import React from 'react';
import ProductList from './components/ProductList';
import Cart from './components/Cart.jsx';

export default function App() {
  return (
    <div className="app-container">
      <header className="navbar">
        <h1>My E-Commerce App 🛍️</h1>
      </header>
      <main className="main-content">
        <ProductList />
        <Cart />
      </main>
    </div>
  );
}
