import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [], // Will store messages for the active chat
  chatId: "", // Will store the current chat's ID
  loading: false, // Can be used to indicate loading state
  error: null, // To capture any errors
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setMessages(state, action) {
      state.messages = action.payload;
    },
    addMessage(state, action) {
      state.messages.push(action.payload);
    },
    setChatId(state, action) {
      state.chatId = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    clearMessages(state) {
      state.messages = [];
      state.chatId = null;
    },
  },
});

export const {
  setMessages,
  addMessage,
  setChatId,
  setLoading,
  setError,
  clearMessages,
} = chatSlice.actions;

// Selector Functions
export const selectChatId = (state) => state.chat.chatId;
export const selectMessages = (state) => state.chat.messages;

export default chatSlice.reducer;
