'use-client'
import React, { useState } from "react";
import { X } from "react-feather";

import styles from "./Editable.module.css";

interface EditableProps {
  defaultValue?: string;
  text: string;
  placeholder?: string;
  editClass?: string;
  displayClass?: string;
  buttonText?: string;
  onSubmit?: (value: string) => void;
}

const Editable: React.FC<EditableProps> = (props) => {
  const [isEditable, setIsEditable] = useState(false);
  const [inputText, setInputText] = useState(props.defaultValue || "");

  const submission = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputText && props.onSubmit) {
      setInputText("");
      props.onSubmit(inputText);
    }
    setIsEditable(false);
  };

  return (
    <div className={styles.editable}>
      {isEditable ? (
        <form
          className={`${styles.editableEdit} ${
            props.editClass ? props.editClass : ""
          }`}
          onSubmit={submission}
        >
          <input
            type="text"
            value={inputText}
            placeholder={props.placeholder || props.text}
            onChange={(event) => setInputText(event.target.value)}
            autoFocus
          />
          <div className={styles.editableEditFooter}>
            <button type="submit">{props.buttonText || "Add"}</button>
            <X
              onClick={() => setIsEditable(false)}
              className={styles.closeIcon}
            />
          </div>
        </form>
      ) : (
        <p
          className={`${styles.editableDisplay} ${
            props.displayClass ? props.displayClass : ""
          }`}
          onClick={() => setIsEditable(true)}
        >
          {props.text}
        </p>
      )}
    </div>
  );
};

export default Editable;
