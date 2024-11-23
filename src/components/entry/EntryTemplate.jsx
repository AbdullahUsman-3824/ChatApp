import "../../Styles/Entry.css";
import { lazy, Suspense } from "react";

// Import React Router hooks
import { useParams, Navigate } from "react-router-dom";

// Import Bootstrap components
import { Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// Lazy load components for different routes
const Login = lazy(() => import("./Login.jsx"));
const Register = lazy(() => import("./Register.jsx"));
const ResetPass = lazy(() => import("./ResetPass.jsx"));

const routeComponentMap = {
  login: Login,
  register: Register,
  resetPassword: ResetPass,
};

export default function EntryTemplate() {
  const { path } = useParams();
  const ComponentToRender = routeComponentMap[path] || Login;

  if (!ComponentToRender) {
    return <Navigate to="/login" />; // Fallback to login if no match
  }

  return (
    <div style={{ marginTop: "5rem" }} >
      <h1 className="mb-5">MeChat</h1>
      <Container className="entry-container">
        <Suspense fallback={<div>Loading...</div>}>
          <ComponentToRender />
        </Suspense>
      </Container>
    </div>
  );
}
