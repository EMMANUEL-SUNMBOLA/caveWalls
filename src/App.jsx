import React from "react";
import Modal from "@/components/ui/Modal";
import { useAlertStore } from "@/store/alertStore";
import { Route, Routes } from "react-router-dom";
import routes from "@/store/routes";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import ProtectedRoutes from "./components/ui/ProtectedRoutes";

export default function App() {
  const { modal } = useAlertStore();
  return (
    <div>
      {modal.visible && <Modal>{modal.content}</Modal>}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {routes.map((route, index) => (
          <Route
            key={index}
            path={route.path}
            element={<ProtectedRoutes>{route.element}</ProtectedRoutes>}
          />
        ))}
      </Routes>
    </div>
  );
}
