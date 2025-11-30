import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useUpdateVideo } from "../hooks/useUpdateVideo";
import { useWindowSize } from "../hooks/useWindowSize";
import { lerp, normalize } from "../lib";
import CharacterImage from "./CharacterImage";
import ImageGallery from "./ImageGallery";
import Video from "./Video";

const SecondVideo = () => {
  useGSAP(() => {
    gsap.to(".second-vd-heading", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".second-vd-heading-container",
        start: "top bottom",
        end: "+=50%",
        scrub: true,
      },
    });

    gsap.to(".jason-sec-image-container", {
      y: "-10%",
      scrollTrigger: {
        trigger: ".jason-sec-image-container",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="second-vd-wrapper pt-[120vh] relative">
      <SecondVdTrigger />

      <div className="relative z-2 flex flex-col md:flex-row-reverse md:items-end md:justify-center">
        <div className="max-w-3/5 ml-[13vw] mb-[15vw] md:w-[43vw] xl:w-[35vw] md:mb-0 md:ml-[2vw] md:mr-auto xl:ml-[1vw] jason-sec-image-container translate-y-[5%]">
          <div className="mb-[18vw] md:w-[56.5vw] xl:w-[40vw] md:ml-[-35vw] xl:mb-[24vw] h-screen second-vd-heading-container">
            <h2 className="text-yellow text-[13vw] md:text-[7vw] xl:text-[5vw] uppercase leading-[0.9] font-long font-black sticky top-[80%] -translate-y-[80%] lg:top-[70%] lg:-translate-y-[70%] second-vd-heading opacity-0">
              If anything happens, <br className="hidden md:block" /> I'm right
              behind you.
              <span
                className="absolute top-[3%] md:top-[5%] right-full rotate-180"
                aria-hidden
              >
                ,,
              </span>
              <span
                className="absolute bottom-[15.5%] md:bottom-[32.5%] right-[5%]"
                aria-hidden
              >
                ,,
              </span>
            </h2>
          </div>

          <h3 className="text-pink-light text-[7.5vw] md:hidden leading-[1.2] font-bold mb-[5vw]">
            Another day in paradise, right?
          </h3>
          <p className="text-white text-[4vw] md:text-[2vw] xl:text-[1.5vw] md:leading-[1.15] font-round-bold md:mb-[10vw] md:max-w-[66%] xl:max-w-[60%] mx-auto">
            Meeting Lucia could be the best or worst thing to ever happen to
            him. Jason knows how he'd like it to turn out but right now, it's
            hard to tell.
          </p>

          <CharacterImage
            width={43}
            height={75}
            className="mr-auto hidden mb-[3vw] md:block xl:!w-[35vw] xl:!h-[60vw]"
            alt="Jason outside on the street leaning against a tree while looking at his phone."
            src={{
              desktop: "/images/jason-4/desktop.webp",
              mobile: "/images/jason-4/mobile.webp",
              blur: "/images/jason-4/blur.png",
            }}
            objectPosition="25% center"
          />
        </div>

        <div className="hidden md:flex flex-col w-[50vw]">
          <h3 className="text-pink-light text-[3.5vw] xl:text-[2.5vw] leading-[1.2] font-bold mb-[7vw] w-1/2 ml-[18vw]">
            Another day in paradise, right?
          </h3>

          <CharacterImage
            width={50}
            height={50}
            className="mr-auto mb-[2vw] xl:mb-[1vw]"
            alt="Jason holding and aiming an automatic weapon."
            src={{
              desktop: "/images/jason-5/desktop.webp",
              mobile: "/images/jason-5/mobile.webp",
              blur: "/images/jason-5/blur.png",
            }}
            objectPosition="10% center"
          />

          <CharacterImage
            width={35}
            height={35}
            className="ml-auto xl:!size-[30vw]"
            alt="Jason and Cal on a boat. Jason is holding a fishing rod and Cal is holding binoculars up to his eyes."
            src={{
              desktop: "/images/jason-6/desktop.webp",
              mobile: "/images/jason-6/mobile.webp",
              blur: "/images/jason-6/blur.png",
            }}
            objectPosition="10% center"
          />
        </div>

        <CharacterImage
          width={97}
          height={160}
          className="ml-auto mb-[3vw] md:hidden"
          alt="Jason outside on the street leaning against a tree while looking at his phone."
          src={{
            desktop: "/images/jason-4/desktop.webp",
            mobile: "/images/jason-4/mobile.webp",
            blur: "/images/jason-4/blur.png",
          }}
          objectPosition="25% center"
        />

        <ImageGallery
          name="jason-sec"
          images={[
            {
              src: {
                desktop: "/images/jason-5/desktop.webp",
                mobile: "/images/jason-5/mobile.webp",
                blur: "/images/jason-5/blur.png",
              },
              alt: "Jason holding and aiming an automatic weapon.",
              width: 75,
              height: 75,
              objectPosition: "10% center",
            },
            {
              src: {
                desktop: "/images/jason-6/desktop.webp",
                mobile: "/images/jason-6/mobile.webp",
                blur: "/images/jason-6/blur.png",
              },
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

const SecondVdTrigger = () => {
  const windowSize = useWindowSize();
  const { videoRef, currentTime } = useUpdateVideo();

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      id: "second-vd",
      trigger: ".second-vd-wrapper",
      start: "top center",
      end: "+=175%",
      scrub: true,
      onUpdate: ({ progress }) => {
        gsap.set(".vd-section-bg", {
          opacity: (normalize(0, 0.1, progress) - 1) * -1,
        });

        if (progress >= 0.8) {
          gsap.set(".vd-section-bg", {
            opacity: normalize(0.8, 1, progress),
          });
        }

        gsap.set("#jason-second", {
          opacity: progress >= 1 || progress <= 0 ? 0 : 1,
        });

        currentTime.current =
          normalize(0, 0.6, progress) * (videoRef.current?.duration || 0);

        gsap.set("#jason-second-backdrop", {
          opacity: normalize(0.6, 1, progress),
        });

        gsap.set("#jason-second-vd", {
          scale: lerp(1.1, 1, normalize(0.6, 1, progress)),
        });
      },
    });

    return () => {
      trigger.kill(true);
    };
  }, [windowSize, videoRef, currentTime]);

  return (
    <Video
      id="jason-second"
      src="/videos/jason-second.mp4"
      label="Jason pointing a gun to someone."
      videoClassName="lg:[object-position:50%_center] [object-position:65%_center]"
      backdropClassName="bg-[radial-gradient(circle_at_60%_20%,transparent_0%,#111117_50%)]"
      videoRef={videoRef}
      currentTime={currentTime}
    />
  );
};

export default SecondVideo;
