import { configureStore } from '@reduxjs/toolkit'
import CartReducer from '../features/cart/CartSlice'
import ProductReducer from '../features/product/ProductSlice'
export const store = configureStore({
  reducer: {
    Cart:CartReducer,  //state.Cart
    Product:ProductReducer, //state.Product
  },
//  devTools :true
})