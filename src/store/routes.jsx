import { Route } from "react-router-dom";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Dashboard from "@/pages/Dashboard";

const routes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
];

export default routes;
