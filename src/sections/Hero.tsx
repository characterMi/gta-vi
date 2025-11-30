import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";

import { heroScrollAnimation } from "../constants";
import { calculateMaskAnimationProps } from "../lib";

import ComingSoon from "../components/ComingSoon";
import Description from "../components/Description";
import LogoIcon from "../components/LogoIcon";
import OpenTrailerDialog from "../components/OpenTrailerDialog";
import WatchTrailer from "../components/WatchTrailer";
import { useWindowSize } from "../hooks/useWindowSize";

const Hero = () => {
  const triggerProgress = useRef(0);

  const windowSize = useWindowSize();

  const shouldRenderVerticalElements = windowSize.aspectRatio >= 2;
  const heroSectionHeight = windowSize.aspectRatio * 10000;

  useEffect(() => {
    const heroMaskData = calculateMaskAnimationProps();

    const scrollTrigger = ScrollTrigger.create(
      heroScrollAnimation({
        ...heroMaskData,
        initialOverlayScale: Math.max(windowSize.width, windowSize.height),
        heroSectionHeight,
      })
    );

    scrollTrigger.scroll(triggerProgress.current || 1);

    return () => {
      triggerProgress.current = scrollTrigger.scroll();
      scrollTrigger.kill(true);
    };
  }, [windowSize]);

  return (
    <>
      <div style={{ height: `${heroSectionHeight}px` }} aria-hidden />

      <section className="overflow-hidden height-svh hero fixed top-0 left-0 w-full">
        <div className="abs-full hero-images-wrapper will-change-transform">
          <div className="hero-image-container scale-105 size-full">
            <Images
              shouldRenderVerticalElements={shouldRenderVerticalElements}
            />
          </div>
        </div>

        <div className="bg-white abs-full opacity-0 fade-overlay" aria-hidden />

        <Mask />

        <OpenTrailerDialog />

        <WatchTrailer
          shouldRenderVerticalElements={shouldRenderVerticalElements}
        />

        <ComingSoon onLogoLoad={windowSize.setNewWindowSize} />

        <Description />
      </section>
    </>
  );
};

const Images = ({
  shouldRenderVerticalElements,
}: {
  shouldRenderVerticalElements: boolean;
}) => {
  const isMobile = window.innerWidth <= 768;

  return (
    <>
      <img
        src={`/images/hero-bg/${isMobile ? "mobile" : "desktop"}.webp`}
        alt="Hero Image"
        className="hero-image"
      />

      {shouldRenderVerticalElements ? (
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
          src={`/images/hero-text/${isMobile ? "mobile" : "desktop"}.webp`}
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
