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
  },
});

export const { addToWishlist, removeFromWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
