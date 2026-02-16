import { useContext } from "react";
import { ToastContext } from "../context/ToastContext";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts } = useContext(ToastContext);

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-3 max-w-md">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} />
      ))}
    </div>
  );
};

export default ToastContainer;
