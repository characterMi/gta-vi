import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Image from "./Image";

const MainCharactersOutro = () => {
  useGSAP(() => {
    gsap.to(".outro-image", {
      y: "5%",
      scrollTrigger: {
        trigger: ".outro-image",
        start: "top bottom",
        end: "bottom 0.25",
        scrub: true,
      },
    });
  }, []);

  return (
    <div
      className="mt-[15vw] w-full height-svh z-1 relative"
      style={{ clipPath: "polygon(0 5%, 100% 5%, 100% 90%, 0 95%)" }}
    >
      <Image
        src={{
          blur: "/images/main-characters-outro/blur.png",
          mobile: "/images/main-characters-outro/mobile.webp",
          desktop: "/images/main-characters-outro/desktop.webp",
        }}
        alt="Jason and Lucia lying on a bed while holding hands."
        className="[object-position:30%_0%]"
        containerClassName="size-full outro-image translate-y-[-5%]"
      />
    </div>
  );
};

export default MainCharactersOutro;
