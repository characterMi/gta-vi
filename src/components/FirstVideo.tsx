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

const FirstVideo = () => {
  useGSAP(() => {
    gsap.to(".jason-first-image-container", {
      y: "-10%",
      scrollTrigger: {
        trigger: ".jason-first-image-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="first-vd-wrapper pt-[220vh] relative">
      <FirstVideoTrigger />

      <div className="relative z-2 flex flex-col items-center md:flex-row md:items-start md:justify-center">
        <div className="max-w-4/5 mb-[15vw] mx-auto md:w-[36vw] md:mb-0 md:mx-0">
          <h2 className="text-yellow text-[20vw] md:text-[8vw] xl:text-[7vw] uppercase leading-[0.9] font-long font-black mb-[18vw] md:mb-[6vw]">
            Jason <br className="md:hidden" /> Duval
          </h2>
          <h3 className="text-pink-light text-[8vw] md:text-[3.5vw] xl:text-[3vw] leading-[1.2] font-bold mb-[5vw] md:mb-[2vw] md:max-w-[70%] lg:max-w-[80%]">
            Jason wants an easy life, but things just keep getting harder.
          </h3>
          <h4 className="text-white text-[4.5vw] md:text-[2vw] xl:text-[1.75vw] md:leading-[1.15] font-round-bold md:mb-[10vw] md:max-w-[70%] lg:max-w-[80%]">
            Jason grew up around grifters and crooks. After a stint in the Army
            trying to shake off his troubled teens, he found himself in the Keys
            doing what he knows best, working for local drug runners. It might
            be time to try something new.
          </h4>

          <CharacterImage
            width={36}
            height={60}
            className="ml-auto hidden md:block"
            alt="Jason sitting on a motorcycle holding a handgun."
            src="/images/jason-2.webp"
            objectPosition="80% center"
          />
        </div>

        <div className="hidden md:flex flex-col w-[40vw] ml-[2vw] mt-[16vw] jason-first-image-container translate-y-[5%]">
          <CharacterImage
            width={51}
            height={51}
            className="mb-[2vw] mr-auto"
            alt="Jason inside a car sitting behind the wheel looking into the distance."
            src="/images/jason-1.webp"
            objectPosition="5% center"
          />

          <CharacterImage
            width={35}
            height={35}
            className="mr-auto"
            alt="Four men in a bar. In the foreground, Jason and Cal are at the bar with beers. In the background two men are looking their way."
            src="/images/jason-3.webp"
            objectPosition="42% center"
          />
        </div>

        <CharacterImage
          width={97}
          height={97}
          className="ml-auto mb-[3vw] md:hidden"
          alt="Jason inside a car sitting behind the wheel looking into the distance."
          src="/images/jason-1.webp"
          objectPosition="5% center"
        />

        <ImageGallery
          name="jason"
          images={[
            {
              src: "/images/jason-2.webp",
              alt: "Jason sitting on a motorcycle holding a handgun.",
              width: 75,
              height: 130,
              objectPosition: "80% center",
            },
            {
              src: "/images/jason-3.webp",
              alt: "Four men in a bar. In the foreground, Jason and Cal are at the bar with beers. In the background two men are looking their way.",
              width: 75,
              height: 130,
              objectPosition: "42% center",
            },
          ]}
        />
      </div>
    </div>
  );
};

const FirstVideoTrigger = () => {
  const windowSize = useWindowSize();
  const { videos, status } = useLoadImageBundle(["/videos/jason-first.bin"]);

  const { canvasRef, renderFrame } = useUpdateVideoOnScroll(
    videos[0],
    windowSize,
    { x: 0.75, y: 0 }
  );

  useEffect(() => {
    const { end: heroEnd } = ScrollTrigger.getById("hero")!;

    const trigger = ScrollTrigger.create({
      id: "first-vd",
      start: heroEnd * 0.95,
      end: heroEnd + windowSize.height * 2,
      scrub: true,
      onUpdate: ({ progress }) => {
        renderFrame(progress);

        gsap.set("#jason-first", {
          filter: `blur(${
            (normalize(0, 0.2, progress) - 1) * -100
          }px) brightness(${normalize(0, 0.3, progress)})`,
          opacity: progress >= 1 ? 0 : normalize(0, 0.3, progress),
        });

        gsap.set("#jason-first-backdrop", {
          opacity: normalize(0.4, 0.9, progress),
        });

        gsap.set(".vd-section-bg", {
          opacity: normalize(0.85, 1, progress),
        });
      },
    });

    return () => {
      trigger.kill(true);
    };
  }, [windowSize, videos]);

  return (
    <VideoOnScroll
      id="jason-first"
      imageProps={{
        alt: "Jason embracing Lucia while looking into the distance.",
        src: "/images/jason-first-poster.webp",
        className: "[object-position:75%_0%]",
        loading: "eager",
      }}
      backdropClassName="bg-[radial-gradient(circle_at_50%_20%,transparent_0%,#111117_50%)] md:bg-[radial-gradient(circle_at_75%_20%,transparent_0%,#111117_50%)]"
      canvasRef={canvasRef}
      status={status}
    />
  );
};

export default FirstVideo;
