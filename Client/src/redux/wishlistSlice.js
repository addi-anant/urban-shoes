import { createSlice } from "@reduxjs/toolkit";

const wishlistSlice = createSlice({
  name: "wishlist",
  initialState: {
    products: [],
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.products = [...state.products, action?.payload];
    },

    removeFromWishlist: (state, action) => {
      state.products = state.products.filter(
        (product) => !(product?._id === action?.payload?._id)
      );
    },
    clearWishlist: (state, action) => {
      state.products = [];
    },
    storeWishlist: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  addToWishlist,
  clearWishlist,
  storeWishlist,
  removeFromWishlist,
} = wishlistSlice.actions;
export default wishlistSlice.reducer;
