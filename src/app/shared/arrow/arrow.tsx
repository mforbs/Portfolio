import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa6";
import styles from "./arrow.module.scss";

interface ArrowProps {
  direction: "up" | "down" | "left" | "right";
  onClick: () => void;
  classes?: string;
  isDisabled?: boolean;
}

export default function Arrow(props: ArrowProps) {
  const { onClick, classes = "", isDisabled = false } = props;
  return (
    <button
      className={`${classes} ${styles.arrow}`}
      onClick={onClick}
      disabled={isDisabled}
    >
      {props.direction === "up" && <FaArrowUp />}
      {props.direction === "down" && <FaArrowDown />}
      {props.direction === "left" && <FaArrowLeft />}
      {props.direction === "right" && <FaArrowRight />}
    </button>
  );
}
