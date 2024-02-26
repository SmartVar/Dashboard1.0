import React from "react";

import styles from "./Modal.module.css";

interface ModalProps {
  onClose?: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = (props) => {
  return (
    <div className={styles.modal} onClick={() => (props.onClose ? props.onClose() : "")}>
      <div className={`${styles.modalContent} background-light900_dark300 light-border-2 text-dark300_light700 
    flex w-full overflow-auto justify-between gap-4 rounded-lg sm:flex-row sm:items-center`} onClick={(event) => event.stopPropagation()}>
        {props.children}
      </div>
    </div>
  );
};

export default Modal;
