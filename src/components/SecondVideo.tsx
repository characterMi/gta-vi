import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect, useRef } from "react";
import { useUpdateVideo } from "../hooks/useUpdateVideo";
import { useWindowSize } from "../hooks/useWindowSize";
import { lerp, normalize } from "../lib";
import CharacterImage from "./CharacterImage";
import ImageGallery from "./ImageGallery";

const SecondVideo = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useGSAP(() => {
    gsap.to(".jason-sec-image-container", {
      y: "-10%",
      scrollTrigger: {
        trigger: ".jason-sec-image-container",
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="second-vd-wrapper pt-[120vh] relative overflow-hidden">
      <SecondVdTrigger videoRef={videoRef} />

      <video
        ref={videoRef}
        muted
        playsInline
        aria-hidden
        src="/videos/jason-second.mp4"
        className="second-vd size-full fixed top-0 left-0 object-cover lg:[object-position:50%_center] [object-position:65%_center] hidden scale-110"
      />

      <div className="relative z-2 flex flex-col md:flex-row-reverse md:items-end md:justify-center">
        <div className="max-w-3/5 ml-[13vw] mb-[15vw] md:w-[43vw] md:mb-0 md:ml-[2vw] md:mr-auto jason-sec-image-container translate-y-[5%]">
          <h2 className="text-yellow text-[13vw] md:text-[7vw] uppercase leading-[0.9] font-long font-black mb-[18vw] relative md:w-[56.5vw] md:ml-[-35vw]">
            If anything happens, <br className="hidden md:block" /> I'm right
            behind you.
            <span
              className="absolute top-[2.6%] md:top-[5%] right-full rotate-180"
              aria-hidden
            >
              ,,
            </span>
            <span
              className="absolute bottom-[16%] md:bottom-[32.5%] right-[5%]"
              aria-hidden
            >
              ,,
            </span>
          </h2>
          <h3 className="text-pink-light text-[7.5vw] md:hidden leading-[1.2] font-bold mb-[5vw]">
            Another day in paradise, right?
          </h3>
          <p className="text-white text-[4vw] md:text-[2vw] md:leading-[1.15] font-round-bold md:mb-[10vw] md:max-w-[66%] mx-auto">
            Meeting Lucia could be the best or worst thing to ever happen to
            him. Jason knows how he'd like it to turn out but right now, it's
            hard to tell.
          </p>

          <CharacterImage
            width={43}
            height={75}
            className="mr-auto hidden mb-[3vw] md:block"
            alt="Jason outside on the street leaning against a tree while looking at his phone."
            src="/images/jason-4.webp"
            objectPosition="25% center"
          />
        </div>

        <div className="hidden md:flex flex-col w-[50vw]">
          <h3 className="text-pink-light text-[3.5vw] leading-[1.2] font-bold mb-[7vw] w-1/2 ml-[18vw]">
            Another day in paradise, right?
          </h3>

          <CharacterImage
            width={50}
            height={50}
            className="mr-auto mb-[2vw]"
            alt="Jason holding and aiming an automatic weapon."
            src="/images/jason-5.webp"
            objectPosition="10% center"
          />

          <CharacterImage
            width={35}
            height={35}
            className="ml-auto"
            alt="Jason and Cal on a boat. Jason is holding a fishing rod and Cal is holding binoculars up to his eyes."
            src="/images/jason-6.webp"
            objectPosition="10% center"
          />
        </div>

        <CharacterImage
          width={97}
          height={160}
          className="ml-auto mb-[3vw] md:hidden"
          alt="Jason outside on the street leaning against a tree while looking at his phone."
          src="/images/jason-4.webp"
          objectPosition="25% center"
        />

        <ImageGallery
          name="json-sec"
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
  const currentTime = useRef(0);
  const windowSize = useWindowSize();

  useUpdateVideo(currentTime, videoRef.current);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      id: "second-vd",
      trigger: ".second-vd-wrapper",
      start: "top center",
      end: "+=175%",
      scrub: 2,
      onUpdate: ({ progress }) => {
        gsap.set(".vd-section-bg", {
          opacity: (normalize(0, 0.1, progress) - 1) * -1,
        });

        if (progress >= 0.8) {
          gsap.set(".vd-section-bg", {
            opacity: normalize(0.8, 1, progress),
          });
        }

        currentTime.current =
          normalize(0, 0.6, progress) * (videoRef.current?.duration || 0);

        gsap.set(".second-vd", {
          scale: lerp(1.1, 1, normalize(0.6, 1, progress)),
        });

        if (progress >= 1 || progress <= 0) {
          gsap.set(".second-vd", {
            display: "none",
          });
        } else {
          gsap.set(".second-vd", {
            display: "block",
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
