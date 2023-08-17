import { createSlice } from "@reduxjs/toolkit";

const filtersAndSearch = createSlice({
  name: "search",
  initialState: {
    brand: [],
    type: [],
    gender: [],
    size: [],
    colour: [],
    cost: 0,
  },
  reducers: {
    search: (state, action) => {
      state.cost = action.payload.cost ? action.payload.cost : state.cost;
      state.brand = action.payload.brand ? action.payload.brand : state.brand;
      state.type = action.payload.type ? action.payload.type : state.type;
      state.gender = action.payload.gender
        ? action.payload.gender
        : state.gender;
      state.size = action.payload.size ? action.payload.size : state.size;
      state.colour = action.payload.colour
        ? action.payload.colour
        : state.colour;
    },
    clearFilterAndSearch: (state) => {
      state.cost = 0;
      state.brand = [];
      state.type = [];
      state.gender = [];
      state.colour = [];
      state.size = [];
    },
  },
});

export const { search, clearFilterAndSearch } = filtersAndSearch.actions;
export default filtersAndSearch.reducer;
