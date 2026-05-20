import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa6";
import styles from "./footer.module.scss";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <span className={`${styles.name} funkie-filled`}>m</span>
      <a
        href="mailto:contact@maxforbes.dev"
        className={`${styles.email} dm-serif`}
      >
        contact@maxforbes.dev
      </a>
      <div className={styles.icons}>
        <a href="https://github.com/mforbs" target="_blank" aria-label="GitHub">
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/maxforbesdev/"
          target="_blank"
          aria-label="LinkedIn"
        >
          <FaLinkedin />
        </a>
      </div>
      <p className={`${styles.copy} montserrat`}>
        © {new Date().getFullYear()} Max Forbes
      </p>
    </footer>
  );
}
