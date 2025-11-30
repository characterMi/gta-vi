import { twMerge } from "tailwind-merge";
import Image from "./Image";

const VideoOnScroll = ({
  id,
  canvasRef,
  imageProps,
  status,
  canvasClassName,
  containerClassName,
  backdropClassName,
}: {
  id: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  imageProps: ImageProps;
  status: ImageBundleLoaderStatus;
  canvasClassName?: string;
  containerClassName?: string;
  backdropClassName?: string;
}) => (
  <div
    className={twMerge(
      "size-full opacity-0 fixed top-0 left-0",
      containerClassName
    )}
    id={id}
  >
    <Image
      {...imageProps}
      containerClassName={twMerge("abs-full", imageProps.containerClassName)}
    />

    <canvas
      aria-hidden
      className={twMerge("abs-full z-1", canvasClassName)}
      ref={canvasRef}
    />

    {status === "error" && (
      <p className="absolute top-1/12 left-1/2 -translate-x-1/2 text-rose-800/80 text-[5vw] md:text-[3vw] lg:text-[2vw] whitespace-nowrap font-bold z-1">
        Couldn't load the video...
      </p>
    )}

    <div
      className={twMerge("abs-full z-2", backdropClassName)}
      aria-hidden
      id={id + "-backdrop"}
    />
  </div>
);

export default VideoOnScroll;
