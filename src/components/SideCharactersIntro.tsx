import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const SideCharactersIntro = () => {
  useGSAP(() => {
    ScrollTrigger.create({
      trigger: ".side-characters-intro",
      start: "top center",
      end: "top top",
      scrub: true,
      onUpdate: ({ progress }) => {
        gsap.set(".side-characters-intro", {
          filter: `hue-rotate(${progress * 90}deg)`,
        });

        gsap.set(".side-characters-section-bg", {
          opacity: progress,
          zIndex: progress > 0 ? 1 : -1,
        });
      },
    });
  }, []);

  return (
    <div className="flex flex-col items-center md:flex-row side-characters-intro relative z-1 max-w-3/4 md:max-w-[70%] lg:max-w-3/5 mx-auto my-[30vw] md:my-[20vw] lg:my-[10vw] hue-rotate-0">
      <h2 className="text-[16vw] md:text-[9vw] lg:text-[7vw] font-black leading-none">
        Only in Leonida
      </h2>

      <p className="mt-[5vw] md:mt-0 md:ml-[5vw] text-[6vw] md:text-[2.5vw] lg:text-[2vw] leading-[1.2] font-black md:w-3/5">
        When the sun fades and the neon glows, everyone has something to gain —
        and more to lose.
      </p>
    </div>
  );
};

export default SideCharactersIntro;
