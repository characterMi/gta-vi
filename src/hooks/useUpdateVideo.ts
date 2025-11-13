import { useEffect } from "react";

export const useUpdateVideo = (
  currentTime: React.RefObject<number>,
  video: HTMLVideoElement | null
) => {
  useEffect(() => {
    let reqId: number | null = null;

    const updateVideo = () => {
      if (currentTime.current === 0 && video) {
        video.currentTime = 0;
      }

      if (video?.ended) return;

      if (currentTime.current > (video?.currentTime || 0)) {
        video?.play();
      } else {
        video?.pause();
      }

      reqId = requestAnimationFrame(updateVideo);
    };

    updateVideo();

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, [video, currentTime]);
};
