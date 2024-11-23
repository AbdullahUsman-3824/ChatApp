// React and related libraries
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { logInUser, fetchUser } from "../../services/userActions.js";
import { useDispatch } from "react-redux";

// UI components
import { TextField, Box, Alert, InputAdornment } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Routing components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  useEffect(() => {
    localStorage.removeItem("CurrentUser");
  }, []);

  const onSubmit = async (formData) => {
    const response = await logInUser(formData);

    if (response.status == 400) {
      setError("signIn", {
        type: "manual",
        message: response.message,
      });
    } else if (response.status == 200) {
      fetchUser(response.userId, dispatch);
      navigate("/");
    }
  };

  return (
    <Row className="justify-content-center">
      <Col>
        <h3 className="welcome-text">Welcome Back</h3>
        <p className="subtext">
          Please Enter Your Credentials to <strong>Log In</strong>
        </p>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            type="text"
            label="Email Address"
            {...register("email", { required: "Email is required" })}
            variant="standard"
            fullWidth
            margin="dense"
            error={!!errors.email}
            helperText={errors.email?.message}
            onChange={() => clearErrors()}
            className="input-field"
          />

          <TextField
            type={showPassword ? "text" : "password"}
            label="Password"
            {...register("password", { required: "Password is required" })}
            variant="standard"
            fullWidth
            margin="dense"
            error={!!errors.password}
            helperText={errors.password?.message}
            onChange={() => clearErrors()}
            className="input-field"
            InputProps={{
              endAdornment: (
                <InputAdornment
                  position="end"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ cursor: "pointer" }}
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </InputAdornment>
              ),
            }}
          />
          <Link to="/resetPassword" className="forgot-text">
            Forgot Password?
          </Link>
          {errors.signIn && (
            <Alert variant="outlined" severity="error" className="alert mt-1 ">
              {errors.signIn?.message}
            </Alert>
          )}
          <Row className="mt-3">
            <Col xs={12} md={6} className="mb-2 mb-md-0">
              <button
                type="submit"
                className="filled-button"
                disabled={isSubmitting}
              >
                Login
              </button>
            </Col>
            <Col xs={12} md={6}>
              <button
                type="button"
                className="outlined-button"
                disabled={isSubmitting}
                onClick={() => navigate("/register")}
              >
                Register
              </button>
            </Col>
          </Row>
        </Box>
      </Col>
    </Row>
  );
}
