import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/CartSlice';

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const dispatch = useDispatch();
  const productsPerPage = 6;

  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
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

  const normalizedSearch = searchTerm.trim().toLowerCase();
  const filteredProducts = products.filter((product) =>
    [product.title, product.category, product.description]
      .some((value) => value?.toLowerCase().includes(normalizedSearch))
  );
  const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
  const visibleProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  return (
    <section className="products-section" id="products">
      <div className="section-heading">
        <div>
          <p className="eyebrow">THE GOOD STUFF</p>
          <h2>Shop our picks</h2>
        </div>
        <span className="product-count">{filteredProducts.length} {filteredProducts.length === 1 ? 'lovely find' : 'lovely finds'}</span>
      </div>

      <div className="product-toolbar">
        <label className="product-search">
          <span className="search-icon" aria-hidden="true">⌕</span>
          <input
            type="search"
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search products..."
            aria-label="Search products"
          />
          {searchTerm && (
            <button
              className="clear-search"
              type="button"
              onClick={() => {
                setSearchTerm('');
                setCurrentPage(1);
              }}
              aria-label="Clear product search"
            >
              ×
            </button>
          )}
        </label>
        <span className="results-count">
          {filteredProducts.length === 0
            ? 'No results'
            : `${(currentPage - 1) * productsPerPage + 1}–${Math.min(currentPage * productsPerPage, filteredProducts.length)} of ${filteredProducts.length}`}
        </span>
      </div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
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

      {filteredProducts.length === 0 ? (
        <div className="no-products">
          <span aria-hidden="true">⌕</span>
          <p>No products match “{searchTerm}”. Try another search.</p>
        </div>
      ) : pageCount > 1 && (
        <nav className="pagination" aria-label="Product pages">
          <button
            className="page-arrow"
            type="button"
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
            aria-label="Previous page"
          >
            ← <span>Previous</span>
          </button>
          <div className="page-numbers">
            {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
              <button
                key={page}
                className={`page-number${currentPage === page ? ' active' : ''}`}
                type="button"
                onClick={() => setCurrentPage(page)}
                aria-label={`Page ${page}`}
                aria-current={currentPage === page ? 'page' : undefined}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            className="page-arrow"
            type="button"
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === pageCount}
            aria-label="Next page"
          >
            <span>Next</span> →
          </button>
        </nav>
      )}
    </section>
  );
}
