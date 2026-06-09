import styles from "./waves.module.scss";

const WAVE1 = [
  "M 0 100 L 0 55 C 180 40 360 20 540 20 C 720 20 900 70 1080 70 C 1260 70 1440 25 1620 25 C 1800 25 1980 68 2160 68 L 2160 100 Z",
  "M 0 100 L 0 22 C 180 22 360 72 540 72 C 720 72 900 18 1080 18 C 1260 18 1440 75 1620 75 C 1800 75 1980 30 2160 30 L 2160 100 Z",
  "M 0 100 L 0 65 C 180 48 360 15 540 15 C 720 15 900 72 1080 72 C 1260 72 1440 22 1620 22 C 1800 22 1980 70 2160 70 L 2160 100 Z",
  "M 0 100 L 0 40 C 180 40 360 78 540 78 C 720 78 900 28 1080 28 C 1260 28 1440 80 1620 80 C 1800 80 1980 18 2160 18 L 2160 100 Z",
];

const WAVE2 = [
  "M 0 100 L 0 68 C 180 52 360 22 540 22 C 720 22 900 82 1080 82 C 1260 82 1440 18 1620 18 C 1800 18 1980 75 2160 75 L 2160 100 Z",
  "M 0 100 L 0 35 C 180 35 360 80 540 80 C 720 80 900 25 1080 25 C 1260 25 1440 85 1620 85 C 1800 85 1980 28 2160 28 L 2160 100 Z",
  "M 0 100 L 0 78 C 180 58 360 20 540 20 C 720 20 900 88 1080 88 C 1260 88 1440 15 1620 15 C 1800 15 1980 82 2160 82 L 2160 100 Z",
  "M 0 100 L 0 25 C 180 25 360 78 540 78 C 720 78 900 30 1080 30 C 1260 30 1440 80 1620 80 C 1800 80 1980 22 2160 22 L 2160 100 Z",
];

const WAVE3 = [
  "M 0 100 L 0 75 C 180 50 360 25 540 25 C 720 25 900 85 1080 85 C 1260 85 1440 20 1620 20 C 1800 20 1980 80 2160 80 L 2160 100 Z",
  "M 0 100 L 0 30 C 180 30 360 85 540 85 C 720 85 900 20 1080 20 C 1260 20 1440 90 1620 90 C 1800 90 1980 30 2160 30 L 2160 100 Z",
  "M 0 100 L 0 60 C 180 45 360 15 540 15 C 720 15 900 90 1080 90 C 1260 90 1440 25 1620 25 C 1800 25 1980 85 2160 85 L 2160 100 Z",
  "M 0 100 L 0 45 C 180 45 360 88 540 88 C 720 88 900 18 1080 18 C 1260 18 1440 85 1620 85 C 1800 85 1980 22 2160 22 L 2160 100 Z",
];

// Builds an alternate (ping-pong) values/keyTimes string for SMIL <animate>.
// keyOffsets are the original keyframe positions as fractions (e.g. [0, 0.3, 0.6, 1]).
function smilAlternate(paths: string[], keyOffsets: number[]) {
  // ping-pong: v0→v1→v2→v3→v2→v1→v0
  const values = [...paths, ...paths.slice(0, -1).reverse()].join(";");
  // forward half occupies 0→0.5, backward half 0.5→1
  const fwd = keyOffsets.map((t) => t * 0.5);
  const bwd = keyOffsets
    .slice(1, -1)
    .reverse()
    .map((t) => 1 - t * 0.5);
  const keyTimes = [...fwd, ...bwd, 1].join(";");
  return { values, keyTimes };
}

const w1 = smilAlternate(WAVE1, [0, 0.3, 0.6, 1]);
const w2 = smilAlternate(WAVE2, [0, 0.4, 0.7, 1]);
const w3 = smilAlternate(WAVE3, [0, 0.35, 0.65, 1]);

export default function Waves() {
  return (
    <div className={styles.container}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2160 100"
        preserveAspectRatio="none"
        className={`${styles.svg} ${styles.wave1}`}
      >
        <path fill="var(--secondary-light)" d={WAVE1[0]}>
          <animate
            attributeName="d"
            values={w1.values}
            keyTimes={w1.keyTimes}
            dur="12s"
            calcMode="spline"
            keySplines={Array(w1.values.split(";").length - 1).fill("0.42 0 0.58 1").join(";")}
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2160 100"
        preserveAspectRatio="none"
        className={`${styles.svg} ${styles.wave2}`}
      >
        <path fill="var(--secondary-mid)" d={WAVE2[0]}>
          <animate
            attributeName="d"
            values={w2.values}
            keyTimes={w2.keyTimes}
            dur="18s"
            calcMode="spline"
            keySplines={Array(w2.values.split(";").length - 1).fill("0.42 0 0.58 1").join(";")}
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2160 100"
        preserveAspectRatio="none"
        className={`${styles.svg} ${styles.wave3}`}
      >
        <path fill="var(--secondary-dark)" d={WAVE3[0]}>
          <animate
            attributeName="d"
            values={w3.values}
            keyTimes={w3.keyTimes}
            dur="28s"
            calcMode="spline"
            keySplines={Array(w3.values.split(";").length - 1).fill("0.42 0 0.58 1").join(";")}
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}