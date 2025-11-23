import { twMerge } from "tailwind-merge";
import { useUpdateVideo } from "../hooks/useUpdateVideo";

type Props = {
  id: string;
  src: string;
  label: string;
  videoClassName: string;
  backdropClassName: string;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  currentTime: React.RefObject<number>;
};

const Video = ({
  id,
  src,
  label,
  videoClassName,
  backdropClassName,
  videoRef,
  currentTime,
}: Props) => {
  useUpdateVideo(currentTime, videoRef.current);

  return (
    <div
      id={id}
      aria-label={label}
      role="video"
      className="opacity-0 size-full fixed top-0 left-0 overflow-hidden"
    >
      <div aria-hidden className="size-full" id={id + "-vd"}>
        <video
          ref={videoRef}
          muted
          playsInline
          src={src}
          className={twMerge("size-full object-cover", videoClassName)}
        />
      </div>

      <div
        aria-hidden
        className={twMerge("abs-full", backdropClassName)}
        id={id + "-backdrop"}
      />
    </div>
  );
};

export default Video;
