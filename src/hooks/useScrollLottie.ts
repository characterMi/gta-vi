import { type AnimationItem } from "lottie-web";
import { useCallback, useState } from "react";
// import type { useWindowSize } from "./useWindowSize";

export const useScrollLottie = () => {
  const [animationInstance, setAnimationInstance] =
    useState<AnimationItem | null>(null);

  const animate = useCallback(
    (progress: number) => {
      if (!animationInstance) return;

      animationInstance.goToAndStop(
        ~~(animationInstance.totalFrames * progress),
        true
      );
    },
    [animationInstance]
  );

  // const onWindowSizeChange = useCallback(
  //   (windowSize: ReturnType<typeof useWindowSize>, objectPosition) => {},
  //   [animationInstance]
  // );

  return {
    animationInstance,
    setAnimationInstance,
    animate,
  };
};
