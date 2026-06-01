import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home";
import Hotels from "./pages/Hotels";
import Flights from "./pages/Flights";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminHotels from "./pages/AdminHotels";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/hotels",
    element: <Hotels />,
  },
  {
    path: "/flights",
    element: <Flights />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/admin/hotels",
    element: <AdminHotels />,
  },
]);

export default router;