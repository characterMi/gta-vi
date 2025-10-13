import gsap from "gsap";

const INITIAL_OVERLAY_SCALE = (window.innerWidth * window.innerHeight) / 1500;
const IS_MOBILE = window.innerWidth <= 768;

const INITIAL_IMAGES_SCALE = IS_MOBILE ? 1 : 1.15;
const INITIAL_IMAGES_SCALE_POWER = IS_MOBILE ? 0.15 : 0.35;

export const calculateHeroMaskSize = (logoMaskBoundingBox: DOMRect) => {
  const logoContainer = document.querySelector(".logo-container")!;
  const logoDimensions = logoContainer.getBoundingClientRect();

  const horizontalScaleRatio = logoDimensions.width / logoMaskBoundingBox.width;
  const verticalScaleRatio = logoDimensions.height / logoMaskBoundingBox.height;

  const logoScaleFactor = Math.min(horizontalScaleRatio, verticalScaleRatio);

  const fromLogoHorizontalPosition =
    window.innerWidth / 2 - logoDimensions.width / 1.25;
  const fromLogoVerticalPosition =
    window.innerHeight / 2 - logoDimensions.height / 1.6;

  const toLogoHorizontalPosition =
    logoDimensions.left +
    (logoDimensions.width - logoMaskBoundingBox.width * logoScaleFactor) / 2 -
    logoMaskBoundingBox.x * logoScaleFactor;
  const toLogoVerticalPosition =
    logoDimensions.top +
    (logoDimensions.height - logoMaskBoundingBox.height * logoScaleFactor) / 2 -
    logoMaskBoundingBox.y * logoScaleFactor;

  return {
    logoScaleFactor,
    fromLogoHorizontalPosition,
    fromLogoVerticalPosition,
    toLogoHorizontalPosition,
    toLogoVerticalPosition,
  };
};

export const heroScrollTriggerProps = (): ScrollTrigger.StaticVars => {
  const logoMask = document.querySelector<SVGGElement>("#logoMask")!;
  const {
    logoScaleFactor,
    fromLogoHorizontalPosition,
    fromLogoVerticalPosition,
    toLogoHorizontalPosition,
    toLogoVerticalPosition,
  } = calculateHeroMaskSize(logoMask.getBBox());

  return {
    trigger: ".hero",
    start: "top top",
    end: `${window.innerHeight * 5}px`,
    pin: true,
    pinSpacing: true,
    scrub: 1,
    onUpdate: (self) => {
      const progress = self.progress;
      const normalizedProgress = progress * (1 / 0.85);
      const imagesScale =
        INITIAL_IMAGES_SCALE - INITIAL_IMAGES_SCALE_POWER * normalizedProgress;

      if (progress <= 0.15) {
        gsap.set([".hero-image-logo", ".logo-watch-trailer"], {
          opacity: 1 - progress * (1 / 0.15),
          scale: imagesScale,
        });
      } else {
        gsap.set([".hero-image-logo", ".logo-watch-trailer"], {
          opacity: 0,
        });
      }

      if (progress <= 0.85) {
        const overlayScale =
          INITIAL_OVERLAY_SCALE *
          Math.pow(1 / INITIAL_OVERLAY_SCALE, normalizedProgress);
        const maskX = lerp(
          fromLogoHorizontalPosition,
          toLogoHorizontalPosition,
          progress / overlayScale
        );
        const maskY = lerp(
          fromLogoVerticalPosition,
          toLogoVerticalPosition,
          progress / overlayScale
        );
        let fadeOverlayOpacity = 0;

        gsap.set(".hero-bg", {
          scale: imagesScale,
        });

        gsap.set(".svg-overlay", {
          scale: overlayScale,
        });

        logoMask.setAttribute(
          "transform",
          `translate(${maskX}, ${maskY}) scale(${logoScaleFactor})`
        );

        if (progress >= 0.25) {
          fadeOverlayOpacity = Math.min(1, (progress - 0.25) * (1 / 0.4));
        }

        gsap.set(".fade-overlay", {
          opacity: fadeOverlayOpacity,
        });
      }
    },
  };
};

const lerp = (min: number, max: number, progress: number) =>
  min + (max - min) * progress;
