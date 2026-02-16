import { useContext, useEffect } from "react";
import { ToastContext } from "../context/ToastContext";
import { FiX, FiCheckCircle, FiAlertCircle, FiInfo } from "react-icons/fi";

const Toast = ({ toast }) => {
  const { removeToast } = useContext(ToastContext);

  useEffect(() => {
    if (toast.autoClose !== false) {
      const timeout = setTimeout(() => {
        removeToast(toast.id);
      }, toast.duration || 3500);
      return () => clearTimeout(timeout);
    }
  }, [toast, removeToast]);

  const getTypeStyles = (type) => {
    const styles = {
      success: {
        bg: "bg-gradient-to-r from-success-500 to-success-600",
        icon: <FiCheckCircle className="w-5 h-5" />,
        border: "border-success-700",
      },
      error: {
        bg: "bg-gradient-to-r from-danger-500 to-danger-600",
        icon: <FiAlertCircle className="w-5 h-5" />,
        border: "border-danger-700",
      },
      warning: {
        bg: "bg-gradient-to-r from-warning-500 to-warning-600",
        icon: <FiAlertCircle className="w-5 h-5" />,
        border: "border-warning-700",
      },
      info: {
        bg: "bg-gradient-to-r from-primary-700 to-primary-900",
        icon: <FiInfo className="w-5 h-5" />,
        border: "border-accent-500",
      },
    };
    return styles[type] || styles.info;
  };

  const { bg, icon, border } = getTypeStyles(toast.type);

  return (
    <div
      className={`
        ${bg}
        ${border}
        border-l-4 text-white p-4 rounded-lg shadow-2xl
        flex items-center gap-3 animate-in slide-in-from-right
        max-w-md backdrop-blur-sm
        transform transition-all duration-300
      `}
    >
      <div className="flex-shrink-0">{icon}</div>
      <div className="flex-grow">
        {toast.title && <p className="font-semibold text-sm">{toast.title}</p>}
        <p className={`text-sm ${toast.title ? "mt-1 opacity-90" : ""}`}>
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => removeToast(toast.id)}
        className="flex-shrink-0 hover:opacity-80 transition-opacity"
      >
        <FiX className="w-5 h-5" />
      </button>
    </div>
  );
};

export default Toast;
