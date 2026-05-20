import styles from "./intro.module.scss";
import WelcomeText from "./welcomeText/welcomeText";
import Waves from "./waves/waves";

export default function Intro() {
  return (
    <section id="about-page" className={`page ${styles.intro}`}>
      <WelcomeText />
      <Waves />
    </section>
  );
}
