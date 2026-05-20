"use client";

import dynamic from "next/dynamic";
const Particle = dynamic(() => import("./particle/particle"), { ssr: false });

import { useEffect, useState } from "react";
import styles from "./skills.module.scss";
import SKILLS from "../../../../public/skills.json";
import Arrow from "@/app/shared/arrow/arrow";
import Image from "next/image";

const MAX_VISIBLE = 7;
const MAX_CENTER_OFFSET = Math.floor(MAX_VISIBLE / 2); // 3

const paddedItems = [
  ...SKILLS.slice(-(MAX_CENTER_OFFSET + 1)),
  ...SKILLS,
  ...SKILLS.slice(0, MAX_CENTER_OFFSET + 1),
];

const PARTICLE_COUNT = 40;
const FIRST_REAL = MAX_CENTER_OFFSET + 1;
const LAST_REAL = MAX_CENTER_OFFSET + 1 + SKILLS.length - 1;

export default function Skills() {
  const [index, setIndex] = useState(FIRST_REAL);
  const [jumping, setJumping] = useState(false);
  const [visible, setVisible] = useState(5);

  useEffect(() => {
    const mq = window.matchMedia("(orientation: landscape)");
    const update = () => setVisible(mq.matches ? 7 : 5);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const slide = (dir: 1 | -1) => {
    setIndex((i) => i + dir);
  };

  const handleTransitionEnd = () => {
    if (index > LAST_REAL) {
      setJumping(true);
      setIndex(FIRST_REAL + (index - LAST_REAL - 1));
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setJumping(false)),
      );
    } else if (index < FIRST_REAL) {
      setJumping(true);
      setIndex(LAST_REAL - (FIRST_REAL - index - 1));
      requestAnimationFrame(() =>
        requestAnimationFrame(() => setJumping(false)),
      );
    }
  };

  const getScale = (i: number) => {
    const distance = Math.abs(i - index);
    return Math.max(0.5, 2 - distance * 1.2);
  };

  const active = paddedItems[index];

  return (
    <section id="skills-page" className={`page dark ${styles.skills}`}>
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <defs>
          <clipPath id="skills-bottom-wave" clipPathUnits="objectBoundingBox">
            <path d="M0,0 L1,0 L1,0.94 C0.857,0.91 0.714,1.0 0.5,0.95 C0.286,0.90 0.143,0.99 0,0.94 Z" />
          </clipPath>
        </defs>
      </svg>
      <div className={styles.controls}>
        <Arrow
          classes={`${styles.arrow} ${styles.left}`}
          direction="left"
          onClick={() => slide(-1)}
        />
        <Arrow
          classes={`${styles.arrow} ${styles.right}`}
          direction="right"
          onClick={() => slide(1)}
        />
      </div>
      {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
        <Particle key={i} />
      ))}
      <span className={`dm-serif secondary-text`}>i'm familiar with</span>
      <div className={styles.carousel}>
        <div
          className={styles.track}
          style={{ "--visible-count": visible } as React.CSSProperties}
        >
          <div
            className={styles.inner}
            style={{
              transform: `translateX(calc(var(--focus-left) - ${index} * (var(--item-size) + var(--gap))))`,
              transition: jumping ? "none" : undefined,
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {paddedItems.map((item, i) => (
              <div
                key={i}
                className={styles.item}
                style={{
                  transform: `scale(${getScale(i)})`,
                  transition: jumping ? "none" : undefined,
                  opacity: getScale(i) / 2,
                  animationDelay: `${(i % visible) * -0.6}s`,
                }}
              >
                {!!item.imagePath && (
                  <Image
                    src={item.imagePath}
                    alt={item.title}
                    className={styles.itemImage}
                    width={24}
                    height={24}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.info}>
        <span className={`dm-serif secondary-text`}>{active.title}</span>
        <span className={`montserrat tertiary-text`}>{active.description}</span>
      </div>
    </section>
  );
}
