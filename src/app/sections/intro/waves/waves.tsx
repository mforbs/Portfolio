import styles from "./waves.module.scss";

export default function Waves() {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2160 100"
        preserveAspectRatio="none"
        className={`${styles.svg} ${styles.wave1}`}
      >
        <path fill="var(--secondary-light)" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2160 100"
        preserveAspectRatio="none"
        className={`${styles.svg} ${styles.wave2}`}
      >
        <path fill="var(--secondary-mid)" />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2160 100"
        preserveAspectRatio="none"
        className={`${styles.svg} ${styles.wave3}`}
      >
        <path fill="var(--secondary-dark)" />
      </svg>
    </div>
  );
}
