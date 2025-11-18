import lottie, { type AnimationItem, type BMEnterFrameEvent } from "lottie-web";
import { useEffect, useRef, type ComponentProps } from "react";
import { twMerge } from "tailwind-merge";

export type ObjectPosition = {
  x: number;
  y: number;
};

type Props = {
  id: string;
  src: string;
  objectPosition:
    | {
        mobile: ObjectPosition;
        desktop: ObjectPosition;
      }
    | ObjectPosition;
  setAnimationInstance: (anim: AnimationItem) => void;
  containerClassName?: string;
  defaultImage: ComponentProps<"img">;
};

const ScrollLottie = ({
  id,
  src,
  // objectPosition,
  containerClassName,
  setAnimationInstance,
  defaultImage,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: containerRef.current!,
      renderer: "canvas",
      loop: false,
      autoplay: false,
      path: src,
      name: id,
      rendererSettings: {
        preserveAspectRatio: "xMidYMin slice",
        imagePreserveAspectRatio: "xMidYMin slice",
        // context: {
        // the object position setup goes here...
        // },
        progressiveLoad: false,
      },
    });

    const onLoad = () => {
      setAnimationInstance(anim);
    };

    const onFrameEnter = ({ currentTime }: BMEnterFrameEvent) => {
      const frame = anim.renderer.elements[currentTime]?.img;

      if (!frame) return;

      const imgW = frame.width;
      const imgH = frame.height;
    };

    anim.addEventListener("DOMLoaded", onLoad);
    anim.addEventListener("enterFrame", onFrameEnter);

    return () => {
      anim.removeEventListener("DOMLoaded", onLoad);
      anim.removeEventListener("enterFrame", onFrameEnter);
      anim.destroy();
    };
  }, [src, setAnimationInstance, id]);

  return (
    <div
      className={twMerge(
        "size-full opacity-0 fixed top-0 left-0",
        containerClassName
      )}
      id={id}
    >
      <img
        {...defaultImage}
        src={defaultImage.src}
        alt={defaultImage.alt}
        className={twMerge("abs-full object-cover", defaultImage.className)}
      />

      <div className="abs-full z-1" ref={containerRef} aria-hidden />
    </div>
  );
};

export default ScrollLottie;
