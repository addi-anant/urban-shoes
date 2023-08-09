import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    cartSummary: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      const Exist = state.products.filter(
        (product) =>
          product._id === action.payload._id &&
          product.selectedSize === action.payload.selectedSize &&
          product.selectedColour === action.payload.selectedColour
      );

      if (Exist?.length === 1) {
        state.products = state.products.map((product) => {
          return product._id === action.payload._id &&
            product.selectedSize === action.payload.selectedSize &&
            product.selectedColour === action.payload.selectedColour
            ? {
                ...product,
                selectedQuantity: product?.selectedQuantity + 1,
              }
            : { ...product };
        });

        state.cartSummary += action?.payload?.cost;
      } else {
        state.products = [...state.products, action?.payload];
        state.cartSummary +=
          action?.payload?.selectedQuantity * action?.payload?.cost;
      }
    },
    increaseQuantity: (state, action) => {
      if (action.payload.quantity === 10) {
        return state;
      }

      state.products = state.products.map((product) => {
        return product._id === action.payload._id &&
          product.selectedSize === action.payload.size &&
          product.selectedColour === action.payload.colour
          ? {
              ...product,
              selectedQuantity: product?.selectedQuantity + 1,
            }
          : { ...product };
      });

      state.cartSummary += action?.payload?.cost;
    },
    decreaseQuantity: (state, action) => {
      if (action.payload.quantity === 1) {
        return state;
      }

      state.products = state.products.map((product) => {
        return product._id === action.payload._id &&
          product.selectedSize === action.payload.size &&
          product.selectedColour === action.payload.colour
          ? {
              ...product,
              selectedQuantity: product?.selectedQuantity - 1,
            }
          : { ...product };
      });

      state.cartSummary -= action?.payload?.cost;
    },
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) =>
          !(
            product?._id === action?.payload?.id &&
            product?.selectedSize === action?.payload?.size &&
            product?.selectedColour === action?.payload?.colour
          )
      );

      state.cartSummary -= action?.payload?.quantity * action?.payload?.cost;
    },
    emptyCart: (state) => {
      state.cartSummary = 0;
      state.products = [];
    },
  },
});

export const {
  addToCart,
  emptyCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;

// emptyCart
// emptyCart: (state) => {
//     state.cartSummary = 0;
//     state.products = [];
// },
