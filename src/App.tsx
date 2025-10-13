import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import { useEffect, useRef, useState } from "react";

import Hero from "./sections/Hero";
import Loading from "./sections/Loading";
import Navbar from "./sections/Navbar";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  const mainContainer = useRef<HTMLDivElement>(null);
  const [isWebsiteLoaded, setIsWebsiteLoaded] = useState(false);

  useEffect(() => {
    let pastTime = 0;
    let isLoadingCompleted = false;

    // TODO: move to the top of the page as soon as the website is loaded
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });

    const update = () => {
      if (pastTime >= 250 && isLoadingCompleted) {
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
                // TODO: prevent scrolling by default, as soon as the animations complete, start the scrolling...
                window.document.body.style.setProperty("cursor", "auto");
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

    const onLoad = () => (isLoadingCompleted = true);

    window.addEventListener("load", onLoad);

    return () => window.removeEventListener("load", onLoad);
  }, []);

  return (
    <ReactLenis
      root
      options={{
        syncTouch: true,
        touchMultiplier: 0.8,
        overscroll: false,
      }}
    >
      <Loading isWebsiteLoaded={isWebsiteLoaded} />

      <div
        aria-busy={!isWebsiteLoaded}
        aria-hidden={!isWebsiteLoaded}
        inert
        ref={mainContainer}
      >
        <Navbar />
        <Hero />
      </div>
    </ReactLenis>
  );
};

export default App;
