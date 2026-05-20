"use client";

import { useEffect, useRef, useState } from "react";
import MFLogo from "./Logo/logo";
import OpenCollapseToggle from "./OpenCollapseToggle/openCollapseToggle";
import styles from "./nav.module.scss";
import LocaleData from "./LocaleData/localeDataDisplay";
import useLocaleData from "./useLocaleData";
import Links from "./Links/links";
import useNavBackground from "./useNavBackground";

export default function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const { localeData, isLoading, error } = useLocaleData();
  const navRef = useRef<HTMLDivElement>(null);
  useNavBackground(navRef);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  return (
    <nav
      className={`${styles.floatingContainer} ${isOpen ? styles.expanded : ""}`}
      data-closed={!isOpen}
      onClick={(e) => {
        if (!(e.target instanceof HTMLDivElement)) return;
        setIsOpen(!isOpen);
      }}
      onMouseEnter={(e) => setIsHovered(true)}
      onMouseLeave={(e) => setIsHovered(false)}
      ref={navRef}
    >
      <div className={styles.headerRow}>
        <MFLogo />
        <OpenCollapseToggle
          isOpen={isOpen}
          isNavHovered={isHovered}
          handleToggle={(val) => setIsOpen(val)}
        />
      </div>
      <div className={styles.drawer}>
        <div className={styles.content}>
          <div className={styles.stack}>
            <div className={`${styles.contact} `}>
              <span className={`${styles.name} dm-serif contrast`}>
                Max Forbes
              </span>
              <a
                href="mailto:contact@maxforbes.dev"
                className={`${styles.email} dm-serif contrast`}
              >
                contact@maxforbes.dev
              </a>
            </div>
            <LocaleData data={localeData} isLoading error={error} />
          </div>
          <Links />
        </div>
      </div>
    </nav>
  );
}
