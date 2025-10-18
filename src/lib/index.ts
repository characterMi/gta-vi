export const calculateHeroMaskSize = () => {
  const logoContainer = document.querySelector(".logo-container")!;
  const logoMask = document.querySelector<SVGGElement>("#logoMask")!;
  const logoDimensions = logoContainer.getBoundingClientRect();
  const logoMaskBoundingBox = logoMask.getBBox();

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
    setLogoMaskTransform: (maskX?: number, maskY?: number, scale?: number) => {
      logoMask.setAttribute(
        "transform",
        `translate(${maskX ?? fromLogoHorizontalPosition}, ${
          maskY ?? fromLogoVerticalPosition
        }) scale(${scale ?? logoScaleFactor})`
      );
    },
    logoScaleFactor,
    fromLogoHorizontalPosition,
    fromLogoVerticalPosition,
    toLogoHorizontalPosition,
    toLogoVerticalPosition,
  };
};
