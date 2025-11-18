export const calculateMaskAnimationProps = () => {
  const maskDestinationEl = document.querySelector(".mask-destination")!;
  const logoMask = document.querySelector<SVGGElement>("#logoMask")!;

  const maskDestinationRect = maskDestinationEl.getBoundingClientRect();
  const maskDimensions = logoMask.getBBox();

  const logoScaleFactor = maskDestinationRect.width / maskDimensions.width;

  const fromX =
    window.innerWidth / 2 - (maskDimensions.width / 1.147) * logoScaleFactor;
  const fromY =
    window.innerHeight / 2 - (maskDimensions.height / 1.35) * logoScaleFactor;

  const toX =
    maskDestinationRect.left - (maskDimensions.width / 2.39) * logoScaleFactor;
  const toY =
    maskDestinationRect.top - (maskDimensions.height / 5.79) * logoScaleFactor;

  return {
    setLogoMaskTransform: (maskX?: number, maskY?: number, scale?: number) => {
      logoMask.setAttribute(
        "transform",
        `translate(${maskX ?? fromX}, ${maskY ?? fromY}) scale(${
          scale ?? logoScaleFactor
        })`
      );
    },
    logoScaleFactor,
    fromX,
    fromY,
    toX,
    toY,
  };
};

// gives us a number between 0-1
export const normalize = (min: number, max: number, progress: number) =>
  Math.min(Math.max((progress - min) / (max - min), 0), 1);

export const lerp = (min: number, max: number, progress: number) =>
  min + (max - min) * progress;

export const getAspectRatio = () => window.innerWidth / window.innerHeight;
