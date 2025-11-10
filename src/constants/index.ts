import gsap from "gsap";
import {
  getAspectRatio,
  lerp,
  normalize,
  type calculateMaskAnimationProps,
} from "../lib";

export const heroScrollAnimation = ({
  fromX,
  fromY,
  toX,
  toY,
  setLogoMaskTransform,
  initialOverlayScale,
}: ReturnType<typeof calculateMaskAnimationProps> & {
  initialOverlayScale: number;
}): ScrollTrigger.StaticVars => {
  const IS_MOBILE = window.innerWidth <= 768;

  const INITIAL_IMAGES_SCALE = IS_MOBILE ? 1 : 1.15;
  const INITIAL_IMAGES_SCALE_POWER = IS_MOBILE ? 0.15 : 0.35;

  return {
    trigger: ".hero",
    start: "top top",
    end: `${getAspectRatio() * 10000}px`,
    pin: true,
    pinSpacing: true,
    scrub: 2,
    onUpdate: ({ progress }) => {
      const firstAnimationNormalizedProgress = progress * (1 / 0.4);
      const scaledNormalizedProgress = normalize(0, 0.4, progress);

      // the mask overlay scale
      const overlayScale = Math.max(
        initialOverlayScale *
          Math.pow(1 / initialOverlayScale, firstAnimationNormalizedProgress),
        1
      );

      gsap.set(".svg-overlay", {
        scale: overlayScale,
      });

      setLogoMaskTransform(
        lerp(fromX, toX, scaledNormalizedProgress / overlayScale),
        lerp(fromY, toY, scaledNormalizedProgress / overlayScale)
      );

      if (progress <= 0.1) {
        gsap.set(
          [".hero-image-logo", ".watch-trailer", ".open-trailer-dialog"],
          {
            opacity: 1 - progress * (1 / 0.1),
            zIndex: 10,
          }
        );
      } else {
        gsap.set(
          [".hero-image-logo", ".watch-trailer", ".open-trailer-dialog"],
          {
            opacity: 0,
            zIndex: -1,
          }
        );
      }

      if (progress >= 0.15) {
        gsap.set(".fade-overlay", {
          opacity: Math.min(1, (progress - 0.15) * (1 / 0.2)),
        });
      }

      if (progress <= 0.4) {
        gsap.set(".hero-images-wrapper", {
          scale: Math.max(
            INITIAL_IMAGES_SCALE -
              INITIAL_IMAGES_SCALE_POWER * firstAnimationNormalizedProgress,
            0.9
          ),
        });
      }

      if (progress >= 0.4) {
        gsap.set([".entrance-message", ".mask-container"], {
          scale: lerp(1.2, 0.8, normalize(0.4, 0.7, progress)),
          zIndex: 10,
        });

        gsap.set(".icons-container", {
          opacity: normalize(0.45, 0.5, progress),
        });

        gsap.set(".coming-soon-text", {
          filter: `hue-rotate(${normalize(0.45, 0.7, progress) * 60}deg)`,
        });
      } else {
        const INITIAL_SCALE = 1.2;
        gsap.set(".entrance-message", {
          maskImage:
            "radial-gradient(150% 150% at 50% 100vh, #111117 0%, transparent 0%)",
          zIndex: -1,
          scale: INITIAL_SCALE,
        });
        gsap.set(".mask-container", {
          scale: INITIAL_SCALE,
        });
      }

      if (progress <= 0.55) {
        const normalizedProgress = normalize(0.4, 0.55, progress);

        const positionPercentage = ~~(normalizedProgress * 100);

        // radial-gradient(150% 150% at 50% (100~0)vh, #111117 (0~50)%, transparent (0~100)%)
        gsap.set(".entrance-message", {
          maskImage: `radial-gradient(150% 150% at 50% ${~~(
            (1 - normalizedProgress) *
            100
          )}vh, #111117 ${
            positionPercentage / 2
          }%, transparent ${positionPercentage}%)`,
        });
        gsap.set(".fade-overlay", {
          background: "#ffffff",
        });
      } else {
        const normalizedProgress = normalize(0.55, 0.7, progress);

        const positionPercentage = ~~((1 - normalizedProgress) * 100);

        // radial-gradient(150% 150% at 50% (100~0)vh, #111117 (50~0)%, transparent (100~0)%)
        gsap.set(".entrance-message", {
          maskImage: `radial-gradient(150% 150% at 50% ${positionPercentage}vh, #111117 ${
            positionPercentage / 2
          }%, transparent ${positionPercentage}%)`,
        });
        // hiding the svg mask
        gsap.set(".fade-overlay", {
          background: "#111117",
        });
      }

      if (progress >= 0.7) {
        gsap.set(".description", {
          scale: lerp(1.2, 0.8, normalize(0.7, 1, progress)),
          filter: `hue-rotate(${normalize(0.75, 1, progress) * 60}deg)`,
        });

        gsap.set(".description-container", {
          zIndex: 10,
        });
      } else {
        gsap.set(".description-container", {
          maskImage:
            "radial-gradient(150% 150% at 50% 100vh, #111117 0%, transparent 0%)",
          zIndex: -1,
        });
      }

      if (progress <= 0.85) {
        const normalizedProgress = normalize(0.7, 0.85, progress);

        const positionPercentage = ~~(normalizedProgress * 100);

        // description at line 110
        gsap.set(".description-container", {
          maskImage: `radial-gradient(150% 150% at 50% ${~~(
            (1 - normalizedProgress) *
            100
          )}vh, #111117 ${
            positionPercentage / 2
          }%, transparent ${positionPercentage}%)`,
        });
      } else {
        const normalizedProgress = normalize(0.85, 1, progress);

        const positionPercentage = ~~((1 - normalizedProgress) * 100);

        // description at line 127
        gsap.set(".description-container", {
          maskImage: `radial-gradient(150% 150% at 50% ${positionPercentage}vh, #111117 ${
            positionPercentage / 2
          }%, transparent ${positionPercentage}%)`,
        });
      }

      if (progress >= 0.95) {
        gsap.set(".hero", {
          opacity: (normalize(0.95, 1, progress) - 1) * -1,
        });
      } else {
        gsap.set(".hero", {
          opacity: 1,
        });
      }
    },
  };
};
