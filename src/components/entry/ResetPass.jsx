// React and related libraries
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Firebase Authentication
import { sendPasswordResetEmail } from "firebase/auth";
import getFirebaseErrorMessage from "../../utils/getMessage.js";
import firebase from "../../firebaseConfig.js";
const { auth } = firebase;

//  UI components
import { TextField, Box, Alert } from "@mui/material";
import { Row, Col } from "react-bootstrap";

const ResetPass = () => {
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    const { email } = formData;
    try {
      sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent. Please check your inbox.");
      setTimeout(() => {
        navigate("/login");
      }, 4000);
    } catch (error) {
      const errorMessage = getFirebaseErrorMessage(error.message);
      setMessage("");
      setError("reset", {
        type: "manual",
        message: errorMessage,
      });
    }
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 400, mx: "auto", mt: 5 }}
    >
      <h2>Reset Password</h2>
      <TextField
        type="text"
        label="Email Address"
        {...register("email", { required: true })}
        variant="standard"
        fullWidth
        margin="dense"
        onChange={() => clearErrors()}
      />
      <Row className="mt-3">
        <Col xs={12} md={6} className="mb-2 mb-md-0">
          <button type="submit" className="filled-button">
            Send Reset Email
          </button>
        </Col>
        <Col xs={12} md={6}>
          <button
            type="button"
            className="outlined-button"
            onClick={() => navigate("/login")}
          >
            Back to LogIn
          </button>
        </Col>
      </Row>
      {(message || errors.reset) && (
        <Alert
          variant="outlined"
          className="alert mt-1 "
          severity={errors.reset && "error"}
        >
          {errors.reset?.message || message}
        </Alert>
      )}
    </Box>
  );
};

export default ResetPass;
