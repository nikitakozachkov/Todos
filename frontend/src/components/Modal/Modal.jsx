import { createPortal } from "react-dom";
import { useEffect } from "react";
import styles from "./Modal.module.css";

export const Modal = ({ isModalOpen, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (isModalOpen && event.code === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModalOpen, onClose]);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.position = "relative";
      document.body.style.overflow = "hidden";
      document.body.style.touchAction = "none";
    }

    return () => document.body.removeAttribute("style");
  }, [isModalOpen]);

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };


  return createPortal(
    <div className={styles.backdrop} onClick={handleBackdropClick}>
      <div className={styles.container}>
        {children}
      </div>
    </div>,
    document.querySelector("#modal-root")
  );
};
