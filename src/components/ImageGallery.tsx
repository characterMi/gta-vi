import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useCallback, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import CharacterImage from "./CharacterImage";

type Props = {
  name: string;
  className?: string;
  images: CharacterImageProps[];
};

const ImageGallery = ({ name, className, images }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const onButtonClick = useCallback(
    (newIndex: number) => {
      setActiveIndex(() => {
        const slideWidth =
          (sliderRef.current?.scrollWidth || 0) / images.length;

        gsap.to(sliderRef.current, {
          x:
            newIndex === 0
              ? newIndex * slideWidth + slideWidth * -0.1
              : -newIndex * slideWidth * 0.9,
          duration: 0.8,
          ease: "power3.out",
        });

        return newIndex;
      });
    },
    [images.length]
  );

  useGSAP(
    () => {
      gsap.to(`.${name}`, {
        opacity: 1,
        scrollTrigger: {
          trigger: `.${name}`,
          start: "top bottom",
          end: "top 0.25",
          scrub: true,
        },
      });

      Draggable.create(sliderRef.current, {
        type: "x",
        activeCursor: "default",
        cursor: "default",
        resistance: 10,
        inertia: true,
        overshootTolerance: 16,
        onRelease: function () {
          const slideWidth = this.target.scrollWidth / images.length;

          const minX = slideWidth * -0.9;
          const maxX = slideWidth * -0.1;

          const newIndex = gsap.utils.clamp(
            0,
            images.length - 1,
            Math.round(this.endX / -slideWidth)
          );
          let targetX = this.x;

          if (this.x > maxX) targetX = maxX;
          else if (this.x < minX) targetX = minX;
          else {
            targetX =
              newIndex === 0
                ? newIndex * slideWidth + slideWidth * -0.1
                : -newIndex * slideWidth * 0.9;
          }

          setActiveIndex(newIndex);

          gsap.to(this.target, {
            x: targetX,
            duration: 0.8,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: sliderRef.current! }
  );

  return (
    <div
      className={twMerge(
        "overflow-hidden w-full opacity-0 md:hidden",
        name,
        className
      )}
      aria-roledescription="Carousel"
      aria-label={`${name} image gallery`}
      role="region"
    >
      {/* Accessibility */}
      <div className="sr-only" aria-live="polite">
        Slide {activeIndex + 1} of {images.length}
      </div>

      <div
        ref={sliderRef}
        className="flex items-center justify-center gap-[3vw] -translate-x-[5%]"
        style={{ width: images.length * 100 + "%" }}
      >
        {images.map((image) => (
          <CharacterImage key={image.src.desktop} {...image} />
        ))}
      </div>

      <div className="flex items-center gap-[3vw] mt-[8vw] p-[6vw] bg-white/5 w-max rounded-full mx-auto">
        {images.map((image, index) => {
          const isActive = activeIndex === index;
          const onClick = () => onButtonClick(index);

          return (
            <button
              key={image.src.desktop}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={isActive}
              className={twMerge(
                "w-[2vw] h-[2vw] rounded-full transition-colors duration-300 cursor-pointer",
                isActive ? "bg-white" : "bg-white/10"
              )}
              onClick={onClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ImageGallery;
