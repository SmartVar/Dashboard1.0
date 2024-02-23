'use client'
import React, { ReactNode, useEffect, useRef } from "react";

import styles from "./Dropdown.module.css";

interface DropdownProps {
  children: ReactNode;
  onClose?: () => void;
  class?: string;
}

const Dropdown: React.FC<DropdownProps> = (props) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node) &&
      props.onClose
    ) {
      props.onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${styles.customScroll} ${props.class || ""}`}
    >
      {props.children}
    </div>
  );
};

export default Dropdown;
