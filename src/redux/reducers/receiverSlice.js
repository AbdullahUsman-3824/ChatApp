import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  receiverInfo: null,
};

const receiverSlice = createSlice({
  name: "receiver",
  initialState,
  reducers: {
    setReceiver: (state, action) => {
      state.receiverInfo = action.payload;
    },
  },
});

export const { setReceiver } = receiverSlice.actions;

// Selector function
export const selectReceiverInfo = (state) => state.receiver.receiverInfo;

export default receiverSlice.reducer;
