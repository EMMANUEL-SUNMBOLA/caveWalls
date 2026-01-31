import React from "react";
import Modal from "./components/Modal";
import Home from "./components/Home";
import { useAlertStore } from "./store/alertStore";

export default function App() {

  const {hideModal, showModal ,modal} = useAlertStore();
  return (
    <div>
      {modal.visible && <Modal>{modal.content}</Modal> }
      <Home />
    </div>
  );
}
