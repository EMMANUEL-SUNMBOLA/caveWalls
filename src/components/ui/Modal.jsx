import React from "react";
import { X } from "lucide-react";
import { useAlertStore } from "@/store/alertStore";

export default function Modal({ children }) {
  const hideModal = useAlertStore((state) => state.hideModal);
  return (
    <div className="inset-0 backdrop-blur-lg bg-black/10 z-30 fixed flex items-center justify-center p-5">
      <div className="z-30 absolute size-full " onClick={hideModal}></div>
      <div className="z-40 flex items-center justify-center relative">
        <div className="absolute -top-5 -right-5" onClick={hideModal}>
          <X size={20} color="white" />
        </div>
        {children}
      </div>
    </div>
  );
}
