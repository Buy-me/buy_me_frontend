import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    subTotal: 0
}

export const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload)
        },
        setProductsCart: (state, action) => {
            state.products = [...action.payload]
        },
        setProductQuantity: (state, action) => {
            const result = action.payload
            let index = state.products.findIndex((item) => item.food_id === result.id)
            if (index > -1) {
                state.products[index].quantity = result.newQty
            } 
            else {
                console.log("ERROR! While updating quantity");
            }
        },
        setSubTotal: (state, action) => {
            state.subTotal = action.payload
        }
    }
})

export const {
    addProduct,
    setSubTotal,
    setProductQuantity,
    setProductsCart,
} = cartSlice.actions

export default cartSlice.reducer