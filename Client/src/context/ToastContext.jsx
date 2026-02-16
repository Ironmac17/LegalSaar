import { createContext, useState, useCallback } from "react";

export const ToastContext = createContext();

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((message, options = {}) => {
    const id = Date.now();
    const toast = {
      id,
      message,
      type: options.type || "info",
      title: options.title || "",
      duration: options.duration || 3500,
      autoClose: options.autoClose !== false,
    };
    setToasts((prev) => [...prev, toast]);
    return id;
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const removeAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  const success = useCallback(
    (message, title = "") => {
      return addToast(message, { type: "success", title });
    },
    [addToast],
  );

  const error = useCallback(
    (message, title = "") => {
      return addToast(message, { type: "error", title: title || "Error" });
    },
    [addToast],
  );

  const warning = useCallback(
    (message, title = "") => {
      return addToast(message, { type: "warning", title: title || "Warning" });
    },
    [addToast],
  );

  const info = useCallback(
    (message, title = "") => {
      return addToast(message, { type: "info", title });
    },
    [addToast],
  );

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        removeAllToasts,
        success,
        error,
        warning,
        info,
      }}
    >
      {children}
    </ToastContext.Provider>
  );
};
