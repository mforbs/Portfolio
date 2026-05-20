import React from "react";
import styles from "./welcomeText.module.scss";

export default function WelcomeText() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <span className={`dm-serif secondary-text`}>hi i'm</span>
        <span className={`funkie-filled primary-text`} data-after="max">
          max
        </span>
        <span className={`dm-serif secondary-text`}>a software developer.</span>
      </div>
    </div>
  );
}
