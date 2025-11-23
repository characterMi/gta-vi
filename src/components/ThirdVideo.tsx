import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useEffect } from "react";
import { useLoadImageBundle } from "../hooks/useLoadImageBundle";
import { useUpdateVideoOnScroll } from "../hooks/useUpdateVideoOnScroll";
import { useWindowSize } from "../hooks/useWindowSize";
import { normalize } from "../lib";
import VideoOnScroll from "./VideoOnScroll";

const ThirdVideo = () => {
  return (
    <div className="third-vd-wrapper pt-[190vh] relative">
      <ThirdVdTrigger />

      <div className="relative z-2 flex flex-col items-center md:flex-row md:items-start md:justify-center">
        <div className="max-w-4/5 mb-[15vw] mx-auto md:w-[36vw] md:mb-0 md:mx-0">
          <h2 className="text-yellow text-[20vw] md:text-[8vw] uppercase leading-[0.9] font-long font-black mb-[18vw] md:mb-[6vw]">
            Lucia Caminos
          </h2>
          <h3 className="text-pink-light text-[8vw] md:text-[3.5vw] leading-[1.2] font-bold mb-[5vw] md:mb-[2vw] md:max-w-[70%]">
            Lucia&apos;s father taught her to fight as soon as she could walk.
          </h3>
          <h4 className="text-white text-[4.5vw] md:text-[2vw] md:leading-[1.15] font-round-bold md:mb-[10vw] md:max-w-[70%]">
            Life has been coming at her swinging ever since. Fighting for her
            family landed her in the Leonida Penitentiary. Sheer luck got her
            out. Lucia&apos;s learned her lesson — only smart moves from here.
          </h4>

          {/* <CharacterImage
            width={36}
            height={60}
            className="ml-auto hidden md:block"
            alt="Jason sitting on a motorcycle holding a handgun."
            src="/images/jason-2.webp"
            objectPosition="80% center"
          /> */}
        </div>

        {/* <div className="hidden md:flex flex-col w-[40vw] ml-[2vw] mt-[16vw] jason-image-container translate-y-[5%]">
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
        </div> */}

        {/* <CharacterImage
          width={97}
          height={97}
          className="ml-auto mb-[3vw] md:hidden"
          alt="Jason inside a car sitting behind the wheel looking into the distance."
          src="/images/jason-1.webp"
          objectPosition="5% center"
        />

        <ImageGallery
          name="json"
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
        /> */}
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
        src: "/images/lucia-first-poster.webp",
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
