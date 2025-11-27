import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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
      className="mt-[15vw] w-full z-1 relative"
      style={{ clipPath: "polygon(0 5%, 100% 5%, 100% 90%, 0 95%)" }}
    >
      <img
        src="/images/main-characters-outro.webp"
        alt="Jason and Lucia Laying on a bed while they're holding hands."
        loading="eager"
        decoding="async"
        className="w-full height-svh object-cover [object-position:30%_0%] outro-image translate-y-[-5%]"
      />
    </div>
  );
};

export default MainCharactersOutro;
