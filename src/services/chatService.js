import { collection, addDoc } from "firebase/firestore";
import firebase from "../firebaseConfig";
const { db } = firebase;


//sendMessage - Sends a message to the specified chat

export const sendMessage = async (chatId, message) => {
  try {
    await addDoc(collection(db, `chats/${chatId}/messages`), message);
  } catch (error) {
    console.error("Error sending message:", error);
    throw new Error("Failed to send message. Please try again.");
  }
};
