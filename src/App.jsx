import ProductList from './components/ProductList.jsx'

import './App.css'

function App() {


  return (
    <>
      <div className="App">

        <header>
          <h1> 🛒 React Cart</h1>
        </header>
        <div className="container">
          <ProductList />
        </div>

      </div>
    </>
  )
}

export default App
