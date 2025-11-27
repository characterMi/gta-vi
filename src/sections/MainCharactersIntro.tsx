import FirstVideo from "../components/FirstVideo";
import FourthVideo from "../components/FourthVideo";
import MainCharactersOutro from "../components/MainCharactersOutro";
import SecondVideo from "../components/SecondVideo";
import ThirdVideo from "../components/ThirdVideo";

const Videos = () => {
  return (
    <section className="relative">
      <div
        className="absolute top-0 left-0 size-full bg-dark opacity-0 vd-section-bg z-1"
        aria-hidden
      />

      <FirstVideo />
      <SecondVideo />
      <ThirdVideo />
      <FourthVideo />
      <MainCharactersOutro />
    </section>
  );
};

export default Videos;
