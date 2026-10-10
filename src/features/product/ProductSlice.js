import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'



export const fetchProducts = createAsyncThunk('Product/fetchProducts', async () => {
    const response = await fetch('https://fakestoreapi.com/products')
    if (!response.ok) throw new Error('Failed to fetch')
    const data = await response.json()
    return data
},
)



const ProductSlice = createSlice({
    name: 'Product',
    initialState: {
        items: [],
        status: 'idle',
        error: null,
    },
    reducer: {}, //no sync reducer needed
    extraReducers: (builder) => {
        builder
            .addCase(fetchProducts.pending, (state) => {
                state.status = 'loading'
            })

            .addCase(fetchProducts.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.items = action.payload
            })

            .addCase(fetchProducts.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
    },


})


export default ProductSlice.reducer