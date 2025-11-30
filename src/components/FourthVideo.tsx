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

const FourthVideo = () => {
  useGSAP(() => {
    gsap.to(".fourth-vd-heading", {
      opacity: 1,
      scrollTrigger: {
        trigger: ".fourth-vd-heading-container",
        start: "top bottom",
        end: "+=50%",
        scrub: true,
      },
    });

    gsap.to(".lucia-sec-image-container", {
      y: "-10%",
      scrollTrigger: {
        trigger: ".lucia-sec-image-container",
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <div className="fourth-vd-wrapper pt-[120vh] relative">
      <FourthVdTrigger />

      <div className="relative z-2 flex flex-col md:flex-row md:items-end md:justify-center">
        <div className="lucia-sec-image-container translate-y-[5%] mb-[15vw] md:w-1/2">
          <div className="h-screen fourth-vd-heading-container w-[70vw] md:w-[60vw] mx-auto md:ml-[12vw] xl:ml-[17vw] xl:mb-[10vw]">
            <h2 className="text-yellow text-[13vw] md:text-[7vw] xl:text-[5vw] uppercase leading-[0.9] font-long font-black sticky top-[80%] -translate-y-[80%] lg:top-[70%] lg:-translate-y-[70%] fourth-vd-heading opacity-0">
              The only thing that matters is who you know and what you got.
              <span
                className="absolute top-[2.5%] md:top-[3%] xl:top-[6%] right-full rotate-180"
                aria-hidden
              >
                ,,
              </span>
              <span
                className="absolute bottom-[13%] md:bottom-[21%] xl:bottom-[32%] right-[40%] md:-right-[2%] xl:right-0"
                aria-hidden
              >
                ,,
              </span>
            </h2>
          </div>

          <h3 className="text-pink-light text-[7.5vw] w-[70vw] mx-auto md:hidden leading-[1.2] font-bold mb-[5vw]">
            A life with <br aria-hidden /> Jason could be <br aria-hidden /> her
            way out.
          </h3>
          <p className="text-white text-[4.5vw] md:text-[2vw] xl:text-[1.5vw] md:leading-[1.15] font-round-bold md:mb-[10vw] w-[70vw] md:w-[50%] xl:w-[45%] mx-auto xl:mx-0 xl:ml-auto xl:mr-[10vw]">
            Fresh out of prison and ready to change the odds in her favor,
            Lucia’s committed to her plan — no matter what it takes.
          </p>

          <CharacterImage
            width={43}
            height={75}
            className="ml-auto hidden mb-[3vw] md:block xl:!w-[38vw] xl:!h-[64vw]"
            alt="Lucia crossing her arms while holding a phone is surrounded by people dancing and flashing lights."
            src={{
              desktop: "/images/lucia-4/desktop.webp",
              mobile: "/images/lucia-4/mobile.webp",
              blur: "/images/lucia-4/blur.png",
            }}
            objectPosition="60% center"
          />
        </div>

        <div className="hidden md:flex flex-col w-[48vw] ml-[2vw]">
          <h3 className="text-pink-light text-[4vw] xl:text-[2.5vw] leading-[1.2] font-bold mb-[7vw] w-[60%] xl:w-[38%] mx-auto xl:mx-0 xl:mr-auto xl:ml-[5vw]">
            A life with Jason could be her way out.
          </h3>

          <CharacterImage
            width={48}
            height={48}
            className="mr-auto mb-[2vw]"
            alt="Lucia holding a handgun while hiding behind a slightly open door. On the other side a man is pointing a handgun through the open gap."
            src={{
              desktop: "/images/lucia-5/desktop.webp",
              mobile: "/images/lucia-5/mobile.webp",
              blur: "/images/lucia-5/blur.png",
            }}
            objectPosition="0% center"
          />

          <CharacterImage
            width={35}
            height={35}
            className="mr-auto xl:!size-[30vw]"
            alt="Lucia leaning on a motorcycle."
            src={{
              desktop: "/images/lucia-6/desktop.webp",
              mobile: "/images/lucia-6/mobile.webp",
              blur: "/images/lucia-6/blur.png",
            }}
            objectPosition="10% center"
          />
        </div>

        <CharacterImage
          width={97}
          height={160}
          className="ml-auto mb-[3vw] md:hidden"
          alt="Lucia crossing her arms while holding a phone is surrounded by people dancing and flashing lights."
          src={{
            desktop: "/images/lucia-4/desktop.webp",
            mobile: "/images/lucia-4/mobile.webp",
            blur: "/images/lucia-4/blur.png",
          }}
          objectPosition="60% center"
        />

        <ImageGallery
          name="lucia-second"
          images={[
            {
              src: {
                desktop: "/images/lucia-5/desktop.webp",
                mobile: "/images/lucia-5/mobile.webp",
                blur: "/images/lucia-5/blur.png",
              },
              alt: "Lucia holding a handgun while hiding behind a slightly open door. On the other side a man is pointing a handgun through the open gap.",
              width: 75,
              height: 75,
              objectPosition: "0% center",
            },
            {
              src: {
                desktop: "/images/lucia-6/desktop.webp",
                mobile: "/images/lucia-6/mobile.webp",
                blur: "/images/lucia-6/blur.png",
              },
              alt: "Lucia leaning on a motorcycle.",
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

const FourthVdTrigger = () => {
  const windowSize = useWindowSize();
  const { videoRef, currentTime } = useUpdateVideo();

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      id: "fourth-vd",
      trigger: ".fourth-vd-wrapper",
      start: "top center",
      end: "+=175%",
      scrub: true,
      onUpdate: ({ progress }) => {
        gsap.set(".main-characters-section-bg", {
          opacity: (normalize(0, 0.1, progress) - 1) * -1,
        });

        if (progress >= 0.8) {
          gsap.set(".main-characters-section-bg", {
            opacity: normalize(0.8, 1, progress),
          });
        }

        gsap.set("#lucia-second", {
          opacity: progress >= 1 || progress <= 0 ? 0 : 1,
        });

        currentTime.current =
          normalize(0, 0.6, progress) * (videoRef.current?.duration || 0);

        gsap.set("#lucia-second-backdrop", {
          opacity: normalize(0.6, 1, progress),
        });

        gsap.set("#lucia-second-vd", {
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
      id="lucia-second"
      src="/videos/lucia-second.mp4"
      label="Lucia sticking her head out of the car."
      videoClassName="[object-position:50%_center]"
      backdropClassName="bg-[radial-gradient(circle_at_50%_20%,transparent_0%,#111117_50%)]"
      videoRef={videoRef}
      currentTime={currentTime}
    />
  );
};

export default FourthVideo;
