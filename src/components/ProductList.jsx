import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/CartSlice';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch('https://fakestoreapi.com/products?limit=3')
      .then((res) => {
        if (!res.ok) throw new Error(`Failed to fetch products (${res.status})`);
        return res.json();
      })
      .then((data) => {
        setProducts(data);
      })
      .catch((err) => {
        console.error('Error fetching data:', err);
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="loading">Loading products...</div>;
  if (error) return <div role="alert">Could not load products: {error}</div>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.image} alt={product.title} />
          <h3>{product.title}</h3>
          <p className="price">${product.price}</p>
          <button onClick={() => dispatch(addToCart(product))}>Add to Cart 🛒</button>
        </div>
      ))}
    </div>
  );
}
