"use client";

import styles from "./bubbles.module.scss";

interface BubblesProps {
  bubbleCount?: number;
}

export default function Bubbles(props: BubblesProps) {
  const { bubbleCount = 20 } = props;

  return (
    <div className={styles.bubbles}>
      {Array.from({ length: bubbleCount }, (_, i) => (
        <div className={styles.bubble} key={i} />
      ))}
    </div>
  );
}
