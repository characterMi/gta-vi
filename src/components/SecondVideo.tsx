import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useWindowSize } from "../hooks/useWindowSize";
import { lerp, normalize } from "../lib";
import CharacterImage from "./CharacterImage";
import ImageGallery from "./ImageGallery";

const SecondVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  return (
    <div className="second-vd-wrapper pt-[120vh] relative overflow-hidden">
      <SecondVdTrigger videoRef={videoRef} />

      <video
        ref={videoRef}
        muted
        playsInline
        src="/videos/jason-second.mp4"
        className="second-vd size-full fixed top-0 left-0 object-cover lg:[object-position:50%_center] [object-position:65%_center] opacity-0 scale-110"
      />

      <div className="relative z-2 flex flex-col md:flex-row md:items-start md:justify-center">
        <div className="max-w-3/5 ml-[13vw] mb-[15vw] md:w-[36vw] md:mb-0 md:mx-0">
          <h2 className="text-yellow text-[13vw] md:text-[8vw] uppercase leading-[0.9] font-long font-black mb-[18vw] md:mb-[6vw] relative">
            If anything happens, I'm right behind you.
            <span
              className="absolute top-[2.6%] right-full rotate-180"
              aria-hidden
            >
              ,,
            </span>
            <span className="absolute bottom-[16%] right-[5%]" aria-hidden>
              ,,
            </span>
          </h2>
          <h3 className="text-pink-light text-[7.5vw] md:text-[3.5vw] leading-[1.2] font-bold mb-[5vw] md:mb-[2vw] md:max-w-[70%]">
            Another day in paradise, right?
          </h3>
          <h4 className="text-white text-[4vw] md:text-[2vw] md:leading-[1.15] font-round-bold md:mb-[10vw] md:max-w-[70%]">
            Meeting Lucia could be the best or worst thing to ever happen to
            him. Jason knows how he'd like it to turn out but right now, it's
            hard to tell.
          </h4>
        </div>

        <CharacterImage
          width={98}
          height={160}
          className="ml-auto mb-[3vw] md:hidden"
          alt="Jason outside on the street leaning against a tree while looking at his phone."
          src="/images/jason-4.webp"
          objectPosition="25% center"
        />

        <ImageGallery
          name="json-sec"
          className="md:hidden"
          images={[
            {
              src: "/images/jason-5.webp",
              alt: "Jason holding and aiming an automatic weapon.",
              width: 75,
              height: 75,
              objectPosition: "10% center",
            },
            {
              src: "/images/jason-6.webp",
              alt: "Jason and Cal on a boat. Jason is holding a fishing rod and Cal is holding binoculars up to his eyes.",
              width: 75,
              height: 75,
              objectPosition: "10% center",
            },
          ]}
        />
      </div>
    </div>
  );
};

const SecondVdTrigger = ({
  videoRef,
}: {
  videoRef: React.RefObject<HTMLVideoElement | null>;
}) => {
  const windowSize = useWindowSize();

  useEffect(() => {
    const firstVideoContainer =
      document.querySelector<HTMLDivElement>(".first-vd-wrapper")!;
    const start =
      firstVideoContainer.getBoundingClientRect().bottom -
      windowSize.height * 0.5;

    console.log(start);

    const trigger = ScrollTrigger.create({
      id: "second-vd",
      start: start,
      end: start + windowSize.height * 1.75,
      scrub: 2,
      onUpdate: ({ progress }) => {
        if (progress <= 0.1) {
          gsap.set(".vd-section-bg", {
            opacity: (normalize(0, 0.1, progress) - 1) * -1,
          });
        }

        if (progress >= 0.8) {
          gsap.set(".vd-section-bg", {
            opacity: normalize(0.8, 1, progress),
          });
        }

        const vidT = lerp(
          0,
          videoRef.current?.duration || 0,
          normalize(0, 0.6, progress)
        );
        console.log(vidT);

        gsap.set(videoRef.current, {
          currentTime: vidT,
        });

        gsap.set(".second-vd", {
          scale: lerp(1.1, 1, normalize(0.6, 1, progress)),
        });

        if (progress > 0) {
          gsap.set(".second-vd", {
            opacity: 1,
          });
        } else {
          gsap.set(".second-vd", {
            opacity: 0,
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

export default SecondVideo;
