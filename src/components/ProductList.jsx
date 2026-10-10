import { useEffect, useState } from 'react';
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

  if (loading) return <section className="products-section" id="products"><div className="loading">Finding your favorites<span className="loading-dots">...</span></div></section>;
  if (error) return <section className="products-section" id="products"><div className="error-message" role="alert">Could not load products: {error}</div></section>;

  return (
    <section className="products-section" id="products">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE GOOD STUFF</p>
          <h2>Shop our picks</h2>
        </div>
        <span className="product-count">{products.length} lovely finds</span>
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-card">
            <div className="product-image-wrap">
              <img src={product.image} alt={product.title} />
              <span className="product-tag">Picked for you</span>
            </div>
            <div className="product-info">
              <h3 title={product.title}>{product.title}</h3>
              <div className="product-buy-row">
                <p className="price">${Number(product.price).toFixed(2)}</p>
                <button aria-label={`Add ${product.title} to cart`} onClick={() => dispatch(addToCart(product))}>
                  Add to cart <span aria-hidden="true">+</span>
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
