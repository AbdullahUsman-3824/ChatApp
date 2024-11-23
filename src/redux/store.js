import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userSlice.js";
import receiverReducer from "./reducers/receiverSlice.js";
import chatReducer from "./reducers/chatSlice.js";

export const store = configureStore({
  reducer: {
    user: userReducer,
    receiver: receiverReducer,
    chat: chatReducer,
  },
});
