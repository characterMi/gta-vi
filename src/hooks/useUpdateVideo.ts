import { useEffect } from "react";

export const useUpdateVideo = (
  currentTime: React.RefObject<number>,
  video: HTMLVideoElement | null
) => {
  useEffect(() => {
    let reqId: number | null = null;
    let shouldPlay = true;

    const updateVideo = () => {
      if (currentTime.current <= 0 && video) {
        video.currentTime = 0;
        shouldPlay = true;
      }

      if (currentTime.current >= (video?.duration || 0)) shouldPlay = false;

      if (shouldPlay) {
        if (currentTime.current > (video?.currentTime || 0)) {
          video?.play();
        } else {
          video?.pause();
        }
      }

      reqId = requestAnimationFrame(updateVideo);
    };

    updateVideo();

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, [video, currentTime]);
};
