"use client";

import { useState } from "react";
import styles from "./projects.module.scss";
import Arrow from "@/app/shared/arrow/arrow";
import PROJECTS from "../../../../public/projects/projects.json";
import Bubbles from "./bubble/bubbles";
import ProjectCard from "./card/card";

const n = PROJECTS.length;
const wrap = (i: number) => ((i % n) + n) % n;

export default function Projects() {
  const [current, setCurrent] = useState(0);

  const slide = (dir: 1 | -1) => setCurrent((c) => c + dir);

  // Render: 2 peeking cards behind, active card, 1 hidden below ready to animate in
  const renderIndices = [current - 2, current - 1, current, current + 1];

  return (
    <section id="projects-page" className={`page ${styles.projects}`}>
      <Bubbles />
      <div className={styles.container}>
        <h2 className={`dm-serif secondary-text white`}>i've worked on</h2>
        <div className={styles.row}>
          <div className={styles.viewport}>
            {renderIndices.map((virtualIndex) => (
              <ProjectCard
                key={virtualIndex}
                item={PROJECTS[wrap(virtualIndex)]}
                offset={virtualIndex - current}
              />
            ))}
          </div>
          <div className={styles.controls}>
            <Arrow
              classes={styles.arrow}
              direction="up"
              onClick={() => slide(-1)}
            />
            <Arrow
              classes={styles.arrow}
              direction="down"
              onClick={() => slide(1)}
            />
          </div>
        </div>
        <h3 className={`dm-serif secondary-text white`}>
          {PROJECTS[wrap(current)].name}
        </h3>
      </div>
      <svg width="0" height="0" aria-hidden style={{ position: "absolute" }}>
        <defs>
          <clipPath id="projects-top-wave" clipPathUnits="objectBoundingBox">
            <path d="M0,40 C200,90 400,0 700,50 C1000,100 1200,10 1400,40 L1400,100 L0,100 Z" />
          </clipPath>
        </defs>
      </svg>
    </section>
  );
}
