import React from "react";
import styles from "./links.module.scss";
import { FaLinkedin } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import Link from "./Link/link";

const Links: React.FC = () => {
  return (
    <div className={styles.stack}>
      <Link label="about" sectionId="about-page" />
      <Link label="skills" sectionId="skills-page" />
      <Link label="projects" sectionId="projects-page" />
      <div className={styles.iconContainer}>
        <a
          href="https://github.com/mforbs"
          target="_blank"
          className={`${styles.icon} ${styles.round} contrast`}
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/maxforbesdev/"
          target="_blank"
          className={`${styles.icon} ${styles.square} contrast`}
        >
          <FaLinkedin />
        </a>
      </div>
    </div>
  );
};

export default Links;
