import Nav from "./nav/nav";
import Intro from "./sections/intro/intro";
import Skills from "./sections/skills/skills";
import Projects from "./sections/projects/projects";
import Footer from "./footer/footer";
import styles from "./page.module.scss";

export default function Home() {
  return (
    <>
      <Nav />
      <main id="main-container" className={styles.main}>
        <Intro />
        <Skills />
        <Projects />
        <Footer />
      </main>
    </>
  );
}
