import { useAlertStore } from "../store/alertStore";
import React from "react";
// import { X } from 'lucide-react';
// import { useAlertStore } from '@/store/alertStore';

export default function Modal({ children }) {
  const hideModal = useAlertStore((state) => state.hideModal);
  return (
    <div className="inset-0 overflow-hidden backdrop-blur-lg bg-black/30 z-30 fixed flex items-center justify-center p-5">
      <div onClick={hideModal} className="z-30 absolute size-full"></div>
      <div className="z-10 flex flex-col items-center justify-center relative">
        <p
          onClick={hideModal}
          className="cursor-pointer absolute -top-10 -right-5 text-red-500 text-2xl bg-red"
        >
          x
        </p>
        <div className="h-full w-full max-w-[80%] max-h-[80vh]">{children}</div>
      </div>
    </div>
  );
}
