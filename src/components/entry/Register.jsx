// React and related libraries
import { useForm } from "react-hook-form";
import { useState } from "react";
import { registerUser } from "../../services/userActions.js";

// UI components
import { TextField, Box, Alert, InputAdornment } from "@mui/material";
import { Row, Col } from "react-bootstrap";
import { Visibility, VisibilityOff } from "@mui/icons-material";

// Routing components
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (formData) => {
    let response = await registerUser(formData, navigate);

    if (response) {
      setError("signUp", {
        type: "manual",
        message: response,
      });
    }
  };

  return (
    <Row className="justify-content-center">
      <Col>
        <h3 className="welcome-text">Join MeChat</h3>
        <p className="subtext">
          Please Enter Your Credentials to <strong>Register</strong>
        </p>
        <Box
          component="form"
          noValidate
          autoComplete="false"
          onSubmit={handleSubmit(onSubmit)}
        >
          <TextField
            type="text"
            label="Full Name"
            {...register("username", { required: "Username is required" })}
            variant="standard"
            fullWidth
            margin="dense"
            onChange={() => clearErrors()}
            error={!!errors.username}
            helperText={errors.username?.message}
            className="input-field"
          />
          <TextField
            type="text"
            label="Email Address"
            {...register("email", { required: "Email is required" })}
            variant="standard"
            fullWidth
            margin="dense"
            onChange={() => clearErrors()}
            error={!!errors.email}
            helperText={errors.email?.message}
            className="input-field"
          />
          <Row>
            <Col md={6}>
              <TextField
                type={showPassword ? "text" : "password"}
                label="Password"
                {...register("password", { required: "Password is required" })}
                variant="standard"
                fullWidth
                margin="dense"
                onChange={() => clearErrors()}
                error={!!errors.password}
                helperText={errors.password?.message}
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
            </Col>
            <Col md={6}>
              <TextField
                type={showConfirmPassword ? "text" : "password"}
                label="Confirm Password"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                })}
                variant="standard"
                fullWidth
                margin="dense"
                onChange={() => clearErrors()}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword?.message}
                className="input-field"
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      style={{ cursor: "pointer" }}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </InputAdornment>
                  ),
                }}
              />
            </Col>
          </Row>
          {(errors.confirmPassword || errors.signUp) && (
            <Alert variant="outlined" severity="error" className="alert mt-1 ">
              {errors.confirmPassword?.message || errors.signUp?.message}
            </Alert>
          )}
          <Row className="mt-1">
            <button
              type="submit"
              className="filled-button"
              disabled={
                isSubmitting ||
                errors.username ||
                errors.password ||
                errors.confirmPassword
              }
            >
              Register
            </button>
            <p className="subtext mt-3">
              Already have an account? <Link to="/login">Login here</Link>
            </p>
          </Row>
        </Box>
      </Col>
    </Row>
  );
}
