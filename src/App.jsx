import React from "react";
import Modal from "@/components/ui/Modal";
import { useAlertStore } from "@/store/alertStore";
import { Route, Routes } from "react-router-dom";
import routes from "./store/routes";

export default function App() {
  const { modal } = useAlertStore();
  return (
    <div>
      {modal.visible && <Modal>{modal.content}</Modal>}

      <Routes>
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element} />
        ))}
      </Routes>
    </div>
  );
}
