import { createPortal } from "react-dom";
import { useState, useMemo } from "react";
import ToastContext from "./ToastContext";
import { Toast } from "../components/Toast";
import ToastWrapper from "../components/ToastWrapper";

// Create a random ID
function generateUEID() {
  let first = (Math.random() * 46656) | 0;
  let second = (Math.random() * 46656) | 0;
  first = ("000" + first.toString(36)).slice(-3);
  second = ("000" + second.toString(36)).slice(-3);

  return first + second;
}

const ToastProvider = (props) => {
  const [toasts, setToasts] = useState([]);
  const open = (content) =>
    setToasts((currentToasts) => [
      ...currentToasts,
      { id: generateUEID(), content },
    ]);
  const close = (id) =>
    setToasts((currentToasts) =>
      currentToasts.filter((toast) => toast.id !== id)
    );

  const contextValue = useMemo(() => ({ open }), []);

  return (
    <ToastContext.Provider value={contextValue}>
      {props.children}

      <ToastWrapper>
        {toasts.map((toast) => (
          <Toast key={toast.id} close={() => close(toast.id)}>
            {toast.content}
          </Toast>
        ))}
      </ToastWrapper>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
