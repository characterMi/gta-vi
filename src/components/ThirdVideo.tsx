import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLoadImageBundle } from "../hooks/useLoadImageBundle";
import { useUpdateVideoOnScroll } from "../hooks/useUpdateVideoOnScroll";
import { useWindowSize } from "../hooks/useWindowSize";
import { normalize } from "../lib";
import CharacterImage from "./CharacterImage";
import ImageGallery from "./ImageGallery";
import VideoOnScroll from "./VideoOnScroll";

const ThirdVideo = () => {
  useGSAP(() => {
    gsap.to(".lucia-description", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".lucia-description",
        start: "top bottom",
        end: "top center",
        scrub: true,
      },
    });

    gsap.to(".lucia-first-image-container", {
      y: "-10%",
      scrollTrigger: {
        trigger: ".lucia-first-image-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="third-vd-wrapper pt-[190vh] relative">
      <ThirdVdTrigger />

      <div className="relative z-2 flex flex-col items-center md:flex-row">
        <div className="hidden md:flex flex-col w-1/2 lucia-first-image-container translate-y-[5%]">
          <CharacterImage
            width={50}
            height={50}
            className="mb-[2vw] lg:mb-[1vw]"
            alt="Lucia punching a heavy bag in a gym."
            src={{
              desktop: "/images/lucia-1/desktop.webp",
              mobile: "/images/lucia-1/mobile.webp",
              blur: "/images/lucia-1/blur.png",
            }}
            objectPosition="85% center"
          />

          <CharacterImage
            width={35}
            height={60}
            className="ml-auto lg:!w-[30vw] lg:!h-[55vw]"
            alt="Inside a jail, Lucia and another woman are handcuffed and wearing orange jumpsuits as they walk by a window where another woman watches through the glass. An officer stands nearby."
            src={{
              desktop: "/images/lucia-2/desktop.webp",
              mobile: "/images/lucia-2/mobile.webp",
              blur: "/images/lucia-2/blur.png",
            }}
            objectPosition="60% center"
          />
        </div>

        <div className="flex flex-col relative w-full md:w-[43vw] md:mr-auto md:ml-[2vw] lg:ml-[1vw]">
          <div className="max-w-[70%] md:max-w-full mb-[15vw] md:mb-0 mx-auto">
            <h2 className="text-yellow text-[19vw] md:text-[8vw] lg:text-[6vw] uppercase leading-[0.9] font-long font-black mb-[12vw] md:mb-[5vw] md:max-w-[70%] md:mx-auto lg:whitespace-nowrap">
              Lucia Caminos
            </h2>
            <h3 className="flex text-pink-light text-[7.5vw] md:text-[3.5vw] lg:text-[2.7vw] leading-[1.2] font-bold mb-[5vw] md:mb-[2vw] md:max-w-[70%] md:mx-auto">
              Lucia's father taught her to fight as soon as she could walk.
              <span className="hidden lg:block size-full" aria-hidden />
            </h3>
            <h4 className="flex text-white text-[4.5vw] md:text-[2vw] lg:text-[1.5vw] leading-[1.15] font-round-bold md:mb-[10vw] md:max-w-[70%] md:mx-auto">
              Life has been coming at her swinging ever since. Fighting for her
              family landed her in the Leonida Penitentiary. Sheer luck got her
              out. Lucia's learned her lesson — only smart moves from here.
              <span className="hidden lg:block size-full" aria-hidden />
            </h4>
          </div>

          <CharacterImage
            width={97}
            height={97}
            className="ml-auto mb-[3vw] md:hidden"
            alt="Lucia punching a heavy bag in a gym."
            src={{
              desktop: "/images/lucia-1/desktop.webp",
              mobile: "/images/lucia-1/mobile.webp",
              blur: "/images/lucia-1/blur.png",
            }}
            objectPosition="85% center"
          />

          <CharacterImage
            width={43}
            height={43}
            className="mr-auto hidden md:block"
            alt="Lucia in sunglasses resting her arms on the side of a pool with a tropical drink beside her and a phone on the other side."
            src={{
              desktop: "/images/lucia-3/desktop.webp",
              mobile: "/images/lucia-3/mobile.webp",
              blur: "/images/lucia-3/blur.png",
            }}
            objectPosition="45% center"
          />

          <ImageGallery
            name="lucia"
            images={[
              {
                src: {
                  desktop: "/images/lucia-2/desktop.webp",
                  mobile: "/images/lucia-2/mobile.webp",
                  blur: "/images/lucia-2/blur.png",
                },
                alt: "Inside a jail, Lucia and another woman are handcuffed and wearing orange jumpsuits as they walk by a window where another woman watches through the glass. An officer stands nearby.",
                width: 75,
                height: 130,
                objectPosition: "60% center",
              },
              {
                src: {
                  desktop: "/images/lucia-3/desktop.webp",
                  mobile: "/images/lucia-3/mobile.webp",
                  blur: "/images/lucia-3/blur.png",
                },
                alt: "Lucia in sunglasses resting her arms on the side of a pool with a tropical drink beside her and a phone on the other side.",
                width: 75,
                height: 130,
                objectPosition: "45% center",
              },
            ]}
          />

          <p className="text-[6vw] md:text-[2vw] lg:text-[1.5vw] font-bold leading-[1.4] max-w-3/4 md:max-w-[65%] mx-auto mt-[12vw] opacity-0 lucia-description">
            More than anything, Lucia wants the good life her mom has dreamed of
            since their days in Liberty City — but instead of half-baked
            fantasies, Lucia is prepared to take matters into her own hands.
          </p>
        </div>
      </div>
    </div>
  );
};

const ThirdVdTrigger = () => {
  const windowSize = useWindowSize();
  const { videos, status } = useLoadImageBundle(["/videos/lucia-first.bin"]);

  const { canvasRef, renderFrame } = useUpdateVideoOnScroll(
    videos[0],
    windowSize,
    { x: [0.75, 0.5, 0.35, 0.25, 0.2, 0.15], y: 0 }
  );

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      id: "third-vd",
      trigger: ".third-vd-wrapper",
      start: "top center",
      end: "+=220%",
      scrub: true,
      onUpdate: ({ progress }) => {
        renderFrame(progress);

        gsap.set("#lucia-first", {
          opacity: progress >= 1 || progress <= 0 ? 0 : 1,
        });

        gsap.set(".vd-section-bg", {
          opacity: (normalize(0, 0.1, progress) - 1) * -1,
        });

        gsap.set("#lucia-first-backdrop", {
          opacity: normalize(0.6, 0.9, progress),
        });

        if (progress >= 0.85) {
          gsap.set(".vd-section-bg", {
            opacity: normalize(0.85, 1, progress),
          });
        }
      },
    });

    return () => {
      trigger.kill(true);
    };
  }, [windowSize, videos]);

  return (
    <VideoOnScroll
      id="lucia-first"
      imageProps={{
        alt: "Lucia hugging Jason near a busy street.",
        src: {
          desktop: "/images/lucia-poster/desktop.webp",
          mobile: "/images/lucia-poster/mobile.webp",
        },
        className: "[object-position:15%_0%]",
        loading: "eager",
      }}
      canvasRef={canvasRef}
      status={status}
      backdropClassName="bg-[radial-gradient(circle_at_30%_20%,transparent_0%,#111117_50%)]"
    />
  );
};

export default ThirdVideo;
