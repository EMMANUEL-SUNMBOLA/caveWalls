import React from "react";
import Modal from "@/components/ui/Modal";
import Home from "@/pages//Home";
import { useAlertStore } from "@/store/alertStore";

export default function App() {

  const {hideModal, showModal ,modal} = useAlertStore();
  return (
    <div>
      {modal.visible && <Modal>{modal.content}</Modal> }
      <Home />
    </div>
  );
}
