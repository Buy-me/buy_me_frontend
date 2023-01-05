import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    favouriteProducts: []
}

export const favouriteSlice = createSlice({
    name: "favourite",
    initialState,
    reducers: {
        setFavouriteProducts: (state, action) => {
            state.favouriteProducts = [...action.payload]
        },
        addToFavourite: (state, action) => {
            state.favouriteProducts.push(action.payload)
        },
        removeFromFavourtie: (state, action) => {
            //only need to pass the id
            let index = state.favouriteProducts.findIndex(p => p.id === action.payload)
            if (index > -1) {
                state.favouriteProducts.splice(index, 1)
            }
            else 
                console.log("ERROR! in redux while removing product from fav");
        },
    }
})

export const {
    setFavouriteProducts,
    addToFavourite,
    removeFromFavourtie,
} = favouriteSlice.actions

export default favouriteSlice.reducer

