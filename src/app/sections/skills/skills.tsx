"use client";

import dynamic from "next/dynamic";
const Particle = dynamic(() => import("./particle/particle"), { ssr: false });

import { useEffect, useRef, useState } from "react";
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

  const touchStartX = useRef<number | null>(null);
  const touchStartIndex = useRef(FIRST_REAL);
  const [swipeOffset, setSwipeOffset] = useState(0);

  const getStep = () => {
    const itemPx = 0.12 * Math.min(window.innerWidth, window.innerHeight);
    const gapPx = (window.innerWidth - visible * itemPx) / (visible - 1);
    return itemPx + gapPx;
  };

  const fractionalIndex =
    swipeOffset !== 0 ? touchStartIndex.current - swipeOffset / getStep() : index;

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartIndex.current = index;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    setSwipeOffset(e.touches[0].clientX - touchStartX.current);
  };

  const handleTouchEnd = () => {
    if (touchStartX.current === null) return;
    const snapped = Math.round(fractionalIndex);
    setSwipeOffset(0);
    setIndex(snapped);
    touchStartX.current = null;
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
    const distance = Math.abs(i - fractionalIndex);
    return Math.max(0.5, 2 - distance * 1.2);
  };

  const displayIndex = Math.max(
    0,
    Math.min(paddedItems.length - 1, Math.round(fractionalIndex)),
  );
  const active = paddedItems[displayIndex];

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
      <div className={styles.carousel} onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}>
        <div
          className={styles.track}
          style={{ "--visible-count": visible } as React.CSSProperties}
        >
          <div
            className={styles.inner}
            style={{
              transform: `translateX(calc(var(--focus-left) - ${fractionalIndex} * (var(--item-size) + var(--gap))))`,
              transition: jumping || swipeOffset !== 0 ? "none" : undefined,
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
