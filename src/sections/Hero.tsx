import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLayoutEffect } from "react";
import { calculateHeroMaskSize, heroScrollTriggerProps } from "../constants";
import { useMediaQuery } from "../hooks/useMediaQuery";

const Hero = () => {
  useGSAP(() => {
    ScrollTrigger.create(heroScrollTriggerProps());
  }, []);

  useLayoutEffect(() => {
    const calculateMaskSize = () => {
      const logoMask = document.querySelector<SVGGElement>("#logoMask")!;
      const {
        fromLogoHorizontalPosition,
        fromLogoVerticalPosition,
        logoScaleFactor,
      } = calculateHeroMaskSize(logoMask.getBBox());

      logoMask.setAttribute(
        "transform",
        `translate(${fromLogoHorizontalPosition}, ${fromLogoVerticalPosition}) scale(${logoScaleFactor})`
      );
    };

    calculateMaskSize();

    window.addEventListener("resize", calculateMaskSize);

    return () => window.removeEventListener("resize", calculateMaskSize);
  }, []);

  return (
    <section className="overflow-hidden height-svh hero">
      <div className="abs-center size-[110%]">
        <div className="hero-image-container scale-105 size-full">
          <Images />
        </div>
      </div>

      <div className="bg-white abs-full opacity-0 fade-overlay" aria-hidden />

      <Mask />

      <div
        className="fixed top-1/5 left-1/2 -translate-y-1/5 -translate-x-1/2 w-48 h-36 logo-container"
        aria-hidden
      />

      {/* TODO: add the gradient + hue effect */}
      {/* <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2">
        <h1 className="uppercase text-8xl font-bold tracking-[-0.2rem] leading-[0.8] text-center ">
          Coming <br /> on 26th <br /> 2026
        </h1>
      </div> */}
    </section>
  );
};

const Images = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <img
        src={isMobile ? "/images/hero-bg-mobile.webp" : "/images/hero-bg.webp"}
        alt="Hero Image"
        className="hero-image hero-bg will-change-transform"
      />

      <img
        src={
          isMobile ? "/images/hero-text-mobile.webp" : "/images/hero-text.webp"
        }
        alt="Grand Theft Auto VI"
        className="hero-image absolute top-0 hero-image-logo scale-125"
      />
    </>
  );
};

const Mask = () => (
  <div className="abs-full h-full svg-overlay">
    <svg width="100%" height="100%">
      <defs>
        <mask id="logoRevealMask">
          <rect width="100%" height="100%" fill="white" />
          <g id="logoMask">
            <path d="M154.7,93.5c0-2.4-1.5-4.6-4.3-4.6h-10.8c-2.7,0-4.3,2.1-4.3,4.6v19.4c0,2.1,1.6,4.3,4.3,4.3s10.8,0,10.9,0c2.1,0,4.2-1.7,4.2-4.3v-19.4h0ZM146.1,110.2h-2.1v-14.2h2.1v14.2Z" />
            <path d="M122.5,88.9h-8.6v1.9h-1.6v7h1.6s0,15.2,0,15.2c0,2.3,1.8,4.3,4.3,4.3h10.8c2.4,0,4.3-1.8,4.3-4.3v-13.4h-8.6v10.6h-2.1v-12.4h10.8v-7h-10.8v-1.9Z" />
            <path d="M102,110.2h-2.1v-21.3h-8.6v24c0,2.1,1.7,4.3,4.3,4.3s10.8,0,10.9,0c2.3,0,4.2-2.1,4.2-4.3v-24h-8.6v21.3h0Z" />
            <path d="M84.7,88.9h-10.8c-2.2,0-4.3,1.7-4.3,4.6v4.2h8.6v-1.8h2.1v3.6h-6.4c-2.6,0-4.3,2.1-4.3,4.6v8.8c0,2.5,1.9,4.3,4.3,4.3h15.1v-23.7c0-2.6-1.8-4.6-4.3-4.6h0ZM80.4,110.2h-2.1v-3.6h2.1v3.6Z" />
            <path d="M182.2,82.5v-11.6h-8.6v8.9h-2.1v-10.7h10.8v-7h-10.8v-3.3h-8.6v3.3h-1.7v7h1.7s0,13.3,0,13.3c0,2,1.6,4.3,4.3,4.3h10.8c2.7,0,4.3-2.2,4.3-4.3h0Z" />
            <path d="M144.5,58.9c-2.2,0-4.3,1.8-4.3,4.3v23.6h8.7v-12.2h10.7v-7h-10.7v-1.7h10.7v-7h-15.1Z" />
            <path d="M138.1,82.5v-4.4h-8.7v1.7h-2.1v-3.5h10.8v-13.1c0-2.6-2.3-4.3-4.3-4.3h-10.8c-2.5,0-4.3,2.1-4.3,4.3v19.3c0,2.3,1.7,4.3,4.3,4.3h10.8c2.1,0,4.3-1.6,4.3-4.3h0ZM127.2,65.8h2.1v3.5h-2.1v-3.5Z" />
            <path d="M94.9,82.5v-11.6h-8.6v8.9h-2.1v-10.7h10.8v-7h-10.8v-3.3h-8.6v3.3h-1.7v7h1.7v13.3c0,2.1,1.7,4.3,4.3,4.3h10.8c2.6,0,4.3-2.1,4.3-4.3h0Z" />
            <path d="M150.9,17.3v7h-6.4c-2,0-4.3,1.6-4.3,4.3v19.2c0,2.5,2,4.3,4.3,4.3h15.1V17.3h-8.6,0ZM150.9,45.1h-2.1v-14h2.1v14Z" />
            <path d="M138,28.6c0-2.1-1.7-4.3-4.3-4.3s-5.1.6-6.4,1.7v-1.7h-8.6v27.8h8.6v-21h2.1v21h8.7v-23.5h0Z" />
            <path d="M116.4,28.6c0-2.8-2.3-4.3-4.3-4.3h-10.8c-2.7,0-4.3,2.2-4.3,4.3v4.3h8.6v-1.8h2.1v3.5s-4,0-6.4,0-4.3,2-4.3,4.3v8.8c0,2.5,2,4.3,4.3,4.3h15.1v-23.5h0ZM107.8,45.1h-2.1v-3.5h2.1s0,3.5,0,3.5Z" />
            <path d="M112.2,58.8h-6.5v-4.8s-10.8,0-10.8,0v-12.4c0-1.4-.7-2.7-1.8-3.5,1.6-1.1,1.8-2.5,1.8-3.4v-6.1c0-2.4-1.9-4.3-4.3-4.3h-15.1v32.3h8.6v-15h2.1s0,12.9,0,12.9c0,2.2,1.7,4.3,4.5,4.3h6.3v27.9h8.6v-21h2.1v21h8.7v-23.6c0-2.4-1.9-4.3-4.3-4.3h0ZM86.3,34.6h-2.1v-3.5h2.1v3.5Z" />
            <path d="M73.3,56.6V24.3s-15.1,0-15.1,0c-2.3,0-4.3,1.9-4.3,4.3v19.2c0,2.3,1.8,4.3,4.3,4.3h6.4v1.9h-10.8v6.9s15.1,0,15.1,0c2.5,0,4.3-2.1,4.3-4.3h0ZM64.7,45.1h-2.1v-14h2.1v14Z" />
          </g>
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
