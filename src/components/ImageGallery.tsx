import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Draggable } from "gsap/Draggable";
import { useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import CharacterImage from "./CharacterImage";

type Props = {
  name: string;
  className?: string;
  images: Image[];
};

const ImageGallery = ({ name, className, images }: Props) => {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleButtonClick = (index: number) => {
    setActiveIndex(index);
    gsap.to(sliderRef.current, {
      x: (-index * (sliderRef.current?.offsetWidth || 0)) / images.length,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  useGSAP(
    () => {
      gsap.to(`.${name}`, {
        opacity: 1,
        duration: 2,
        scrollTrigger: {
          trigger: `.${name}`,
          start: "top bottom",
          end: "top 0.25",
          scrub: true,
        },
      });

      Draggable.create(sliderRef.current, {
        type: "x",
        resistance: 10,
        bounds: ".gallery-wrapper",
        inertia: true,
        edgeResistance: 0.8,
        overshootTolerance: 16,
        onDragEnd: function () {
          const slideWidth = this.target.offsetWidth / images.length;
          const newIndex = Math.round(Math.abs(this.x) / slideWidth);

          setActiveIndex(newIndex);

          gsap.to(this.target, {
            x: -newIndex * slideWidth,
            duration: 0.5,
            ease: "power1.inOut",
          });
        },
      });
    },
    { scope: sliderRef.current! }
  );

  return (
    <div
      className={twMerge(
        "gallery-wrapper overflow-hidden w-full opacity-0",
        name,
        className
      )}
    >
      <div
        ref={sliderRef}
        className="flex items-center justify-center gap-[3vw]"
        style={{ width: images.length * 100 + "%" }}
      >
        {images.map((image) => (
          <CharacterImage key={image.src} {...image} />
        ))}
      </div>

      <div className="flex items-center gap-[3vw] mt-[8vw] p-[6vw] bg-white/5 w-max rounded-full mx-auto">
        {images.map((image, index) => (
          <button
            key={image.src}
            onClick={() => handleButtonClick(index)}
            className={twMerge(
              "w-[2vw] h-[2vw] rounded-full transition-colors duration-300 cursor-pointer",
              activeIndex === index ? "bg-white" : "bg-white/10"
            )}
            aria-label={`Click to view image ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
