import gsap from "gsap";
import type { calculateHeroMaskSize } from "../lib";

const INITIAL_OVERLAY_SCALE = (window.innerWidth * window.innerHeight) / 1500;
const IS_MOBILE = window.innerWidth <= 768;

const INITIAL_IMAGES_SCALE = IS_MOBILE ? 1 : 1.15;
const INITIAL_IMAGES_SCALE_POWER = IS_MOBILE ? 0.15 : 0.35;

export const heroScrollTriggerProps = ({
  fromLogoHorizontalPosition,
  fromLogoVerticalPosition,
  toLogoHorizontalPosition,
  toLogoVerticalPosition,
  setLogoMaskTransform,
}: ReturnType<typeof calculateHeroMaskSize>): ScrollTrigger.StaticVars => {
  return {
    trigger: ".hero",
    start: "top top",
    end: `${window.innerHeight * 15}px`,
    pin: true,
    pinSpacing: true,
    scrub: 2,
    onUpdate: (self) => {
      const progress = self.progress;
      const normalizedProgress = progress * (1 / 0.4);
      const imagesScale =
        INITIAL_IMAGES_SCALE - INITIAL_IMAGES_SCALE_POWER * normalizedProgress;

      if (progress <= 0.05) {
        gsap.set(
          [".hero-image-logo", ".watch-trailer", ".open-trailer-dialog"],
          {
            opacity: 1 - progress * (1 / 0.05),
            zIndex: 10,
          }
        );

        gsap.set(".hero-image-logo", {
          scale: imagesScale,
        });
      } else {
        gsap.set(
          [".hero-image-logo", ".watch-trailer", ".open-trailer-dialog"],
          {
            opacity: 0,
            zIndex: -1,
          }
        );
      }

      if (progress <= 0.4) {
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

        setLogoMaskTransform(maskX, maskY);

        if (progress >= 0.15) {
          fadeOverlayOpacity = Math.min(1, (progress - 0.15) * (1 / 0.2));
        }

        gsap.set(".fade-overlay", {
          opacity: fadeOverlayOpacity,
        });
      }

      if (progress >= 0.4) {
        const scale = lerp(1.2, 0.8, normalize(0.4, 0.7, progress));
        const iconsContainerOpacity = lerp(
          0,
          1,
          normalize(0.45, 0.5, progress)
        );
        const hueRotate = lerp(0, 60, normalize(0.45, 0.7, progress));

        gsap.set([".entrance-message", ".mask-container"], {
          scale,
        });

        gsap.set(".icons-container", {
          opacity: iconsContainerOpacity,
        });

        gsap.set(".coming-soon-text", {
          filter: `hue-rotate(${hueRotate}deg)`,
        });

        if (progress <= 0.55) {
          const normalizedProgress = normalize(0.4, 0.55, progress);

          const gradientPosition = ~~((1 - normalizedProgress) * 100);
          const gradientBlackPosition = ~~(normalizedProgress * 50);
          const gradientTransparentPosition = ~~(normalizedProgress * 100);

          gsap.set(".entrance-message", {
            maskImage: `radial-gradient(150% 150% at 50% ${gradientPosition}vh, black ${gradientBlackPosition}%, transparent ${gradientTransparentPosition}%)`,
            zIndex: 10,
          });
          gsap.set(".fade-overlay", {
            background: "#ffffff",
          });
        } else {
          const normalizedProgress = normalize(0.5, 0.7, progress);

          const gradientPosition = ~~((1 - normalizedProgress) * 100);
          const gradientBlackPosition = ~~((1 - normalizedProgress) * 50);
          const gradientTransparentPosition = ~~(
            (1 - normalizedProgress) *
            100
          );

          gsap.set(".entrance-message", {
            maskImage: `radial-gradient(150% 150% at 50% ${gradientPosition}vh, black ${gradientBlackPosition}%, transparent ${gradientTransparentPosition}%)`,
          });
          gsap.set(".fade-overlay", {
            background: "#111117",
          });
        }
      } else {
        const INITIAL_SCALE = 1.2;
        gsap.set(".entrance-message", {
          maskImage:
            "radial-gradient(150% 150% at 50% 100vh, black 0%, transparent 0%)",
          zIndex: -1,
          scale: INITIAL_SCALE,
        });
        gsap.set(".mask-container", {
          scale: INITIAL_SCALE,
        });
      }

      if (progress >= 0.7) {
        const scale = lerp(1.2, 0.8, normalize(0.7, 1, progress));
        const hueRotate = lerp(0, 60, normalize(0.75, 1, progress));

        gsap.set(".description", {
          scale,
          filter: `hue-rotate(${hueRotate}deg)`,
        });

        if (progress <= 0.85) {
          const normalizedProgress = normalize(0.75, 0.85, progress);

          const gradientPosition = ~~((1 - normalizedProgress) * 100);
          const gradientBlackPosition = ~~(normalizedProgress * 50);
          const gradientTransparentPosition = ~~(normalizedProgress * 100);

          gsap.set(".description-container", {
            maskImage: `radial-gradient(150% 150% at 50% ${gradientPosition}vh, black ${gradientBlackPosition}%, transparent ${gradientTransparentPosition}%)`,
            zIndex: 10,
          });
        } else {
          const normalizedProgress = normalize(0.8, 1, progress);

          const gradientPosition = ~~((1 - normalizedProgress) * 100);
          const gradientBlackPosition = ~~((1 - normalizedProgress) * 50);
          const gradientTransparentPosition = ~~(
            (1 - normalizedProgress) *
            100
          );

          gsap.set(".description-container", {
            maskImage: `radial-gradient(150% 150% at 50% ${gradientPosition}vh, black ${gradientBlackPosition}%, transparent ${gradientTransparentPosition}%)`,
          });
        }
      } else {
        gsap.set(".description-container", {
          maskImage:
            "radial-gradient(150% 150% at 50% 100vh, black 0%, transparent 0%)",
          zIndex: -1,
        });
      }
    },
  };
};

const normalize = (min: number, max: number, progress: number) =>
  Math.min(Math.max((progress - min) / (max - min), 0), 1);

const lerp = (min: number, max: number, progress: number) =>
  min + (max - min) * progress;
