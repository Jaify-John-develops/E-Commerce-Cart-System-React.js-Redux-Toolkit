import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../features/product/ProductSlice'

const ProductList = () => {
  const dispatch = useDispatch()
  const { items, status, error } = useSelector(state => state.Product)


  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchProducts())
    }
  }, [status, dispatch])

  if (status === 'loading') {
    return <div className='loader'>Loading amazing products...</div>
  }

  if (status === 'failed') {
    return <div className='error'>Error: {error}</div>
  }
  console.log("items", items)
  console.log("status", status)
  console.log("error", error)

  return (
    <div>
      Product List
    </div>
  )
}

export default ProductList
