"use client";

import React from "react";
import styles from "./link.module.scss";

interface LinkProps {
  label: string;
  sectionId: string;
}

const Link: React.FC<LinkProps> = (props: LinkProps) => {
  const { label, sectionId } = props;

  const handleClick = () => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a
      onClick={handleClick}
      className={`${styles.link} dm-serif contrast`}
      data-content={label}
    >
      {label}
    </a>
  );
};

export default Link;
