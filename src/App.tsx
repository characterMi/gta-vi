import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLenis } from "lenis/react";
import { useInsertionEffect, useRef, useState } from "react";

import Hero from "./sections/Hero";
import Loading from "./sections/Loading";
import MainCharacters from "./sections/MainCharacters";
import Navbar from "./sections/Navbar";
import SideCharacters from "./sections/SideCharacters";

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(Draggable);

const App = () => {
  const lenis = useLenis();
  const mainContainer = useRef<HTMLDivElement>(null);
  // TODO: set this to false when the website is ready
  const [isWebsiteLoaded, setIsWebsiteLoaded] = useState(true);

  useInsertionEffect(() => {
    let pastTime = 0;
    let isLoadingCompleted = false;

    const update = () => {
      if (
        pastTime >= 250 &&
        isLoadingCompleted /* TODO: && pastTime % 125 === 0 */
      ) {
        gsap
          .timeline()
          .to(".loading-gradient-effect", {
            opacity: 0,
            ease: "power1.in",
          })
          .to(".loading-svg", {
            fill: "#1e2a52",
            stroke: "#1e2a52",
            ease: "power1.inOut",
            duration: 0.8,
          })
          .to(".loading-svg", {
            opacity: 0,
            delay: 0.25,
            ease: "power1.inOut",
            duration: 0.5,
          })
          .to(".loading-container", {
            delay: 0.5,
            opacity: 0,
            ease: "power1.inOut",
            onComplete: () => {
              setIsWebsiteLoaded(true);
              mainContainer.current?.removeAttribute("inert");
            },
          })
          .to(
            ".hero-image-container",
            {
              scale: 1,
              duration: 1.5,
              ease: "power1.inOut",
              onComplete: () => {
                window.document.body.style.setProperty("cursor", "auto");
                lenis?.start();
              },
            },
            "<"
          );

        return;
      }

      pastTime++;
      requestAnimationFrame(update);
    };

    requestAnimationFrame(update);

    const onLoad = () => {
      isLoadingCompleted = true;

      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      lenis?.scrollTo(0, {
        offset: 0,
        duration: 0,
        immediate: true,
      });
      // TODO: uncomment this line when the website is ready
      // lenis?.stop();
    };

    window.addEventListener("load", onLoad);

    return () => {
      window.removeEventListener("load", onLoad);
    };
  }, [lenis]);

  return (
    <>
      <Loading isWebsiteLoaded={isWebsiteLoaded} />

      <div
        aria-busy={!isWebsiteLoaded}
        aria-hidden={!isWebsiteLoaded}
        inert
        ref={mainContainer}
      >
        <Navbar />
        <Hero />
        <MainCharacters />
        <SideCharacters />
      </div>
    </>
  );
};

export default App;
