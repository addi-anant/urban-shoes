import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: null,
  },
  reducers: {
    userLogin: (state, action) => {
      state.user = action.payload;
    },
    clearInfo: (state) => {
      state.user = null;
    },
    updateInfo: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { userLogin, clearInfo, updateInfo } = userSlice.actions;
export default userSlice.reducer;
