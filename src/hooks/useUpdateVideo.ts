import { useEffect, useRef } from "react";

export const useUpdateVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const currentTime = useRef(0);

  useEffect(() => {
    let reqId: number | null = null;

    videoRef.current?.play().then(() => videoRef.current?.pause());

    const updateVideo = () => {
      if (currentTime.current <= 0 && videoRef.current) {
        videoRef.current.currentTime = 0;
      }

      if (currentTime.current > (videoRef.current?.currentTime || 0)) {
        // the 0.05 or 50ms is to prevent the video from playing when it's about to end
        if (currentTime.current < (videoRef.current?.duration || 0) - 0.05) {
          videoRef.current?.play();
        }
      } else {
        videoRef.current?.pause();
      }

      reqId = requestAnimationFrame(updateVideo);
    };

    updateVideo();

    return () => {
      if (reqId) cancelAnimationFrame(reqId);
    };
  }, []);

  return {
    videoRef,
    currentTime,
  };
};
