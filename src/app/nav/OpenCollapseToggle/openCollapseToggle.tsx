import { useMemo } from "react";
import styles from "./openCollapseToggle.module.scss";

interface OpenCollapseToggleProps {
  isOpen?: boolean;
  isNavHovered?: boolean;
  handleToggle: (isOpen: boolean) => void;
}

export default function OpenCollapseToggle({
  isOpen,
  isNavHovered,
  handleToggle,
}: OpenCollapseToggleProps) {
  const style = useMemo(() => {
    return { "--open-factor": isOpen ? 1 : -1 } as React.CSSProperties;
  }, [isOpen]);

  const handleClick = (e: React.MouseEvent) => {
    if (isOpen) e.stopPropagation();
    handleToggle(!isOpen);
  };

  return (
    <button
      className={`contrast ${styles.openCollapseToggle} ${isNavHovered ? styles.navHovered : ""}`}
      style={style}
      onClick={handleClick}
    >
      <div className={styles.toggleRow}></div>
      <div className={styles.toggleRow}></div>
    </button>
  );
}
