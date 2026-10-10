import ProductList from './components/ProductList';
import Cart from './components/Cart.jsx';

export default function App() {
  return (
    <div className="app-container">
      <header className="site-header">
        <a className="brand" href="#" aria-label="Cartly home">
          <span className="brand-mark" aria-hidden="true">c</span>
          <span className="brand-name">cartly<span>.</span></span>
        </a>
        <p className="header-note"><span className="status-dot" /> Thoughtful finds, delivered with care</p>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">A LITTLE SOMETHING FOR YOU</p>
          <h1>Good finds.<br />Better <span>everyday.</span></h1>
          <p className="hero-description">
            Discover useful, lovely things picked to make your day a little brighter.
          </p>
          <a className="hero-link" href="#products">Explore the collection <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-art" aria-hidden="true">
          <span className="hero-sparkle sparkle-one">✳</span>
          <span className="hero-bag">🛍️</span>
          <span className="hero-sparkle sparkle-two">✦</span>
          <span className="hero-art-label">little joys, right this way</span>
        </div>
      </section>

      <main className="main-content">
        <ProductList />
        <Cart />
      </main>
    </div>
  );
}
