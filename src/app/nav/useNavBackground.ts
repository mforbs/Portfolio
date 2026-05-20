"use client";

import { useEffect, RefObject } from "react";


export default function useNavBackground(navRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const sample = () => {
      const nav = navRef.current;
      if (!nav) return;

      const rect = nav.getBoundingClientRect();
      const sampleY = rect.top + rect.height / 2;
      const sampleX = rect.left + rect.width / 2;

      const elements = document.elementsFromPoint(sampleX, sampleY);

      const section = elements.find(el => el.tagName.toLowerCase() === "section");
      const navColor = section
        ? getComputedStyle(section).getPropertyValue("--contrast-text-color").trim()
        : null;
      if (navColor) nav.style.setProperty("--contrast-text-color", navColor);

      const sectionId = section?.id;
      if (sectionId) document.body.style.setProperty("--current-section", sectionId);
    };

    sample();
    const scroller = document.getElementById("main-container")!;
    scroller.addEventListener("scroll", sample, { passive: true });
    return () => scroller.removeEventListener("scroll", sample);
  }, [navRef]);
}
