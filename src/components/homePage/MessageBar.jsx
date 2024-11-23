import React from "react";
import { useSelector } from "react-redux";
import { selectReceiverInfo } from "../../redux/reducers/receiverSlice";
import { selectUserInfo } from "../../redux/reducers/userSlice.js";
import { selectChatId } from "../../redux/reducers/chatSlice.js";

import { TextField, Button, Box } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { sendMessage } from "../../services/chatService"; // Abstract Firebase interactions

/**
 * MessageBar Component - Handles message input and sending
 */
export default function MessageBar() {
  const receiverInfo = useSelector(selectReceiverInfo);
  const currentUser = useSelector(selectUserInfo);
  const currentChatId = useSelector(selectChatId);

  const {
    register,
    handleSubmit,
    reset,
    resetField,
    formState: { errors, isSubmitting },
  } = useForm();

  //onSend - Submits the message to Firebase

  const onSend = async (data) => {
    if (!receiverInfo || !currentUser || !currentChatId) return;

    try {
      await sendMessage(currentChatId, {
        senderId: currentUser.uid,
        content: data.message,
        sentAt: new Date(),
      });
      reset();
      resetField();
    } catch (error) {
      console.error("Error sending message: ", error);
    }
  };

  return (
    <div className="message-bar w-full px-4 absolute bottom-0 pb-4 shadow-lg rounded-lg">
      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmit(onSend)}
        className="flex items-center w-full"
      >
        <Row className="w-full">
          <Col xs={11}>
            <TextField
              type="text"
              label="Type a message..."
              id="message"
              variant="outlined"
              {...register("message", { required: true })}
              className="w-full rounded message-input"
              InputProps={{
                style: { color: "white" },
              }}
              InputLabelProps={{
                style: { color: "#BBBBBB" }, // Label color
              }}
            />
          </Col>
          <Col xs={1} className="pl-2">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className="w-full"
              disabled={isSubmitting}
              style={{
                height: "100%",
                borderRadius: "8px",
              }}
            >
              <SendIcon />
            </Button>
          </Col>
        </Row>
      </Box>
    </div>
  );
}
