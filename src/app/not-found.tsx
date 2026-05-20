import { FaArrowLeft } from "react-icons/fa6";
import styles from "./not-found.module.scss";

export default function Custom404() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={`${styles.message} secondary-text dm-serif`}>oops!</p>
        <h1 className={`primary-text funkie-filled`} data-after="404">
          404
        </h1>
        <p className={`${styles.message} secondary-text dm-serif`}>
          page not found
        </p>
        <a href="/" className={`montserrat tertiary-text ${styles.link}`}>
          <FaArrowLeft /> Go back
        </a>
      </div>
    </div>
  );
}
