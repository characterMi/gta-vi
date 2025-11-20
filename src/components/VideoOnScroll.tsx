import { twMerge } from "tailwind-merge";

const VideoOnScroll = ({
  id,
  canvasRef,
  // status,
  canvasClassName,
  containerClassName,
}: {
  id: string;
  canvasRef: React.RefObject<HTMLCanvasElement | null>;
  status: ImageBundleLoaderStatus;
  canvasClassName?: string;
  containerClassName?: string;
}) => (
  <div
    className={twMerge(
      "size-full opacity-0 fixed top-0 left-0",
      containerClassName
    )}
    id={id}
  >
    <canvas
      aria-hidden
      className={twMerge("abs-full", canvasClassName)}
      ref={canvasRef}
    />

    {/* {status === "error" && (
      // DEFAULT IMAGE AND A TEXT
    )} */}
  </div>
);

export default VideoOnScroll;
