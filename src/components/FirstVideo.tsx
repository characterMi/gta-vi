import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { lerp, normalize } from "../lib";
import CharacterImage from "./CharacterImage";
import ImageGallery from "./ImageGallery";

const FirstVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.to(".jason-image-container", {
      y: "-5%",
      scrollTrigger: {
        trigger: ".jason-image-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="first-vd-wrapper pt-[220vh] relative">
      <FirstVdTrigger videoRef={videoRef} />

      <video
        ref={videoRef}
        muted
        playsInline
        src="/videos/jason-first.mp4"
        className="first-vd opacity-0 size-full fixed top-0 left-0 object-cover lg:[object-position:50%_center] [object-position:75%_center]"
      />

      <div className="relative z-2 flex flex-col items-center md:flex-row md:items-start md:justify-center">
        <div className="max-w-4/5 mb-[15vw] mx-auto md:w-[36vw] md:mb-0 md:mx-0">
          <h2 className="text-yellow text-[20vw] md:text-[8vw] uppercase leading-[0.9] font-long font-black mb-[18vw] md:mb-[6vw]">
            Jason <br className="md:hidden" /> Duval
          </h2>
          <h3 className="text-pink-light text-[8vw] md:text-[3.5vw] leading-[1.2] font-bold mb-[5vw] md:mb-[2vw] md:max-w-[70%]">
            Jason wants an easy life, but things just keep getting harder.
          </h3>
          <h4 className="text-white text-[4.5vw] md:text-[2vw] md:leading-[1.15] font-round-bold md:mb-[10vw] md:max-w-[70%]">
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

        <div className="hidden md:flex flex-col w-[40vw] ml-[2vw] mt-[16vw] jason-image-container translate-y-[5%]">
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
          width={98}
          height={98}
          className="ml-auto mb-[3vw] md:hidden"
          alt="Jason inside a car sitting behind the wheel looking into the distance."
          src="/images/jason-1.webp"
          objectPosition="5% center"
        />

        <ImageGallery
          name="json"
          className="md:hidden"
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

const FirstVdTrigger = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => {
  const windowSize = useWindowSize();

  useEffect(() => {
    const { end: heroEnd } = ScrollTrigger.getById("hero")!;

    const trigger = ScrollTrigger.create({
      id: "first-vd",
      start: heroEnd * 0.97,
      end: heroEnd + windowSize.height * 2,
      scrub: 2,
      onUpdate: ({ progress }) => {
        gsap.set(".first-vd", {
          filter: `blur(${(normalize(0, 0.2, progress) - 1) * -10}px)`,
        });

        gsap.set(".vd-section-bg", {
          opacity: normalize(0.75, 1, progress),
        });

        gsap.set(videoRef.current, {
          currentTime: lerp(
            0,
            videoRef.current?.duration || 0,
            normalize(0, 0.9, progress)
          ),
        });

        if (progress >= 0.95) {
          gsap.set(".first-vd", {
            opacity: 0,
          });
        } else {
          gsap.set(".first-vd", {
            opacity: normalize(0, 0.5, progress),
          });
        }
      },
    });

    return () => {
      trigger.kill(true);
    };
  }, [windowSize, videoRef]);

  return null;
};

export default FirstVideo;
