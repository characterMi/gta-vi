import FirstVideo from "../components/FirstVideo";
import FourthVideo from "../components/FourthVideo";
import MainCharactersOutro from "../components/MainCharactersOutro";
import SecondVideo from "../components/SecondVideo";
import ThirdVideo from "../components/ThirdVideo";

const Videos = () => (
  <section className="relative">
    <div
      className="fixed top-0 left-0 size-full black-gradient-bg opacity-0 main-characters-section-bg -z-1 will-change-[opacity]"
      aria-hidden
    />

    <FirstVideo />
    <SecondVideo />
    <ThirdVideo />
    <FourthVideo />
    <MainCharactersOutro />
  </section>
);

export default Videos;
