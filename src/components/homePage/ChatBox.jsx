import { useEffect, useState, useCallback, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectReceiverInfo } from "../../redux/reducers/receiverSlice";
import { selectUserInfo } from "../../redux/reducers/userSlice.js";
import {
  setMessages,
  setChatId,
  selectMessages,
} from "../../redux/reducers/chatSlice.js";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import MessageBar from "./MessageBar.jsx";
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";
import fireStore from "../../firebaseConfig.js";
const { db } = fireStore;
import "../../Styles/ChatBox.css";

const ChatBox = () => {
  const receiverInfo = useSelector(selectReceiverInfo);
  const userInfo = useSelector(selectUserInfo);
  const messages = useSelector(selectMessages);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const messagesEndRef = useRef(null);

  // Scroll to the bottom of the message container
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Fetch chat and messages when receiver or user info changes
  useEffect(() => {
    if (receiverInfo && userInfo) {
      findChat(userInfo.uid, receiverInfo.uid);
    }
  }, [receiverInfo, userInfo]);

  useEffect(() => {
    // Automatically scroll to the bottom when new messages arrive
    scrollToBottom();
  }, [messages]);

  //Finds an existing chat between the current user and the receiver or creates a new one.
  const findChat = useCallback(
    async (currentUserId, receiverId) => {
      setLoading(true);
      setError(null);

      try {
        // Query to find any existing chat of the current user
        const chatQuery = query(
          collection(db, "chats"),
          where("participants", "array-contains", currentUserId)
        );
        const querySnapshot = await getDocs(chatQuery);

        let chatExists = false;
        let chatId = null;

        // Check if chat with the receiver exists
        querySnapshot.forEach((doc) => {
          const chatData = doc.data();
          if (chatData.participants.includes(receiverId)) {
            chatExists = true;
            chatId = doc.id;
          }
        });

        if (chatExists) {
          dispatch(setChatId(chatId)); // Dispatch existing chat ID
          fetchMessages(chatId); // Fetch message
        } else {
          // If no chat exists, create a new one
          const newChatRef = await addDoc(collection(db, "chats"), {
            participants: [currentUserId, receiverId],
            createdAt: new Date(),
          });
          dispatch(setChatId(newChatRef.id)); // Dispatch new chat ID
        }
      } catch (error) {
        setError("Error checking or creating chat.");
        console.error("Error checking or creating chat:", error);
      } finally {
        setLoading(false);
      }
    },
    [dispatch]
  );

  // Fetch messages for the specified chatId, and set up a real-time listener.
  const fetchMessages = useCallback(
    (chatId) => {
      const messageQuery = query(
        collection(db, `chats/${chatId}/messages`),
        orderBy("sentAt", "asc") // Order by timestamp
      );

      // Real-time listener for messages
      const unsubscribe = onSnapshot(messageQuery, (snapshot) => {
        const fetchedMessages = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
          sentAt: doc.data().sentAt?.toDate().toISOString() || null,
        }));
        dispatch(setMessages(fetchedMessages)); // Update messages in Redux
      });

      // Clean up listener on unmount
      return () => unsubscribe();
    },
    [dispatch]
  );

  // Loading and error handling
  if (loading) {
    return (
      <div className="emptyBox flex justify-center items-center h-full">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="emptyBox flex justify-center items-center h-full">
        <p>{error}</p>
      </div>
    );
  }

  if (!receiverInfo) {
    return (
      <div className="emptyBox flex justify-center items-center h-full">
        <p>No receiver selected</p>
      </div>
    );
  }

  return (
    <div className="chat-box-container h-[calc(100vh-48px)] flex flex-col  ">
      {/* Title Bar */}
      <div className="chat-title h-16 flex items-center px-4 shadow-lg z-10">
        {receiverInfo?.profilePic ? (
          <img
            src={receiverInfo.profilePic}
            alt="Profile"
            className="rounded-full w-12 h-12"
          />
        ) : (
          <AccountCircleIcon style={{ fontSize: "2.5rem" }} />
        )}
        <div className="ml-4 text-xl ">{receiverInfo?.name || "User"}</div>
      </div>

      {/* Messages Container */}
      <div className="messages-container flex-1 overflow-y-auto px-10 py-20 custom-scrollbar">
        {messages?.map((message) => {
          const isSender = message.senderId === userInfo.uid;
          return (
            <div
              key={message.id}
              className={`message-bubble mb-4 flex ${
                isSender ? "justify-end " : "justify-start "
              }`}
            >
              <div
                className={`py-2 px-4  rounded-xl max-w-md text-lg ${
                  isSender ? "rounded-tr-none" : "rounded-tl-none"
                }`}
                style={{
                  background: isSender ? "#3e7297" : "	#3E3A44",
                }}
              >
                <p
                  className={`message-text mb-0 ${
                    isSender ? "text-right" : "text-left"
                  } `}
                >
                  {message.content}
                </p>
                <p
                  className={`message-time text-xs  mb-1 ${
                    message.senderId === userInfo.uid
                      ? "text-left"
                      : "text-right"
                  }`}
                >
                  {new Date(message.sentAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          );
        })}
        {/* Ref to ensure auto-scrolling */}
        <div ref={messagesEndRef} />
      </div>

      {/* Message Input Bar */}
      <MessageBar />
    </div>
  );
};

export default ChatBox;
