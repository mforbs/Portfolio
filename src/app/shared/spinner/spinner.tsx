import React from "react";
import styles from "./spinner.module.scss";
import { ImSpinner8 } from "react-icons/im";

interface SpinnerProps {
  size?: number;
}

const Spinner: React.FC = (props: SpinnerProps) => {
  const { size = 24 } = props;
  return (
    <div className={styles.spinner}>
      <ImSpinner8 className={styles.spinnerIcon} size={size} />
    </div>
  );
};

export default Spinner;
