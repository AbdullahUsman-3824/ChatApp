import { useDispatch } from "react-redux";
import { fetchUser } from "./services/userActions.js";
import { useEffect, lazy, Suspense } from "react";

// // Importing CSS and Bootstrap styles
import "./Styles/Entry.css";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

// // Importing React Router components
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// // Importing components for routing
const EntryTemplate = lazy(() =>
  import("./components/entry/EntryTemplate.jsx")
);
import Home from "./components/homePage/Home.jsx";
import ProtectedRoute from "./components/entry/ProtectedRoute.jsx";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    const userId = localStorage.getItem("CurrentUser");
    if (userId) {
      fetchUser(userId, dispatch);
    }
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        {/* Protected route for the Home component */}
        <Route path="/" element={<ProtectedRoute component={Home} />} />

        {/* Entry template for login, registration, and password reset */}
        <Route
          path="/:path"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <EntryTemplate />
            </Suspense>
          }
        />
      </Routes>
    </Router>
    // <h1>HELLO</h1>
  );
}
