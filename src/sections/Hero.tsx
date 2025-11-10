import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useCallback, useEffect, useRef, useState } from "react";

import { heroScrollAnimation } from "../constants";
import { calculateMaskAnimationProps, getAspectRatio } from "../lib";

import ComingSoon from "../components/ComingSoon";
import Description from "../components/Description";
import LogoIcon from "../components/LogoIcon";
import OpenTrailerDialog from "../components/OpenTrailerDialog";
import WatchTrailer from "../components/WatchTrailer";

const Hero = () => {
  const triggerProgress = useRef(0);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const shouldRenderVerticalImages = getAspectRatio() >= 2;

  const setNewWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    const heroMaskData = calculateMaskAnimationProps();

    const scrollTrigger = ScrollTrigger.create(
      heroScrollAnimation({
        ...heroMaskData,
        initialOverlayScale: Math.max(windowSize.width, windowSize.height),
      })
    );

    scrollTrigger.scroll(triggerProgress.current);

    return () => {
      triggerProgress.current = scrollTrigger.scroll();
      scrollTrigger.kill(true);
    };
  }, [windowSize]);

  useEffect(() => {
    window.addEventListener("orientationchange", setNewWindowSize);
    window.addEventListener("resize", setNewWindowSize);

    return () => {
      window.removeEventListener("orientationchange", setNewWindowSize);
      window.removeEventListener("resize", setNewWindowSize);
    };
  }, [setNewWindowSize]);

  return (
    <section className="overflow-hidden height-svh hero">
      <div className="abs-center size-[110%] hero-images-wrapper will-change-transform">
        <div className="hero-image-container scale-105 size-full">
          <Images shouldRenderVerticalImages={shouldRenderVerticalImages} />
        </div>
      </div>

      <div className="bg-white abs-full opacity-0 fade-overlay" aria-hidden />

      <div
        className="mask-start-position fixed w-0 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />

      <Mask />

      <OpenTrailerDialog />

      <WatchTrailer shouldRenderVerticalImages={shouldRenderVerticalImages} />

      <ComingSoon onLogoLoad={setNewWindowSize} />

      <Description />
    </section>
  );
};

const Images = ({
  shouldRenderVerticalImages,
}: {
  shouldRenderVerticalImages: boolean;
}) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <img
        src={isMobile ? "/images/hero-bg-mobile.webp" : "/images/hero-bg.webp"}
        alt="Hero Image"
        className="hero-image"
      />

      {shouldRenderVerticalImages ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          viewBox="-190 15 600 107"
          fill="white"
          aria-hidden
          className="hero-image absolute w-1/2 top-0 hero-image-logo"
        >
          <LogoIcon />
        </svg>
      ) : (
        <img
          src={
            isMobile
              ? "/images/hero-text-mobile.webp"
              : "/images/hero-text.webp"
          }
          alt="Grand Theft Auto VI"
          className="hero-image absolute top-0 hero-image-logo"
        />
      )}
    </>
  );
};

const Mask = () => (
  <div className="abs-full h-full svg-overlay origin-center" aria-hidden>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
      width="100%"
      height="100%"
      preserveAspectRatio="xMidYMid slice"
      className="mask-container"
    >
      <defs>
        <mask id="logoRevealMask">
          <rect width="100%" height="100%" fill="white" />
          <LogoIcon id="logoMask" />
        </mask>
      </defs>

      <rect
        width="100%"
        height="100%"
        fill="#111117"
        mask="url(#logoRevealMask)"
      />
    </svg>
  </div>
);

export default Hero;
