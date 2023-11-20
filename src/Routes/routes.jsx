import { createBrowserRouter } from "react-router-dom";
import Register from "../Pages/Register";
import NotFound from "../Pages/NotFound";
import Dashboard from "../Pages/Dashboard";
import Login from "../Pages/Login";
import { ProtectedRoute } from "./ProtectedRoute";

const routes = createBrowserRouter([
  {
    path: "/",
    element: <Register />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default routes;
