import FirstVideo from "../components/FirstVideo";
import SecondVideo from "../components/SecondVideo";

const Videos = () => {
  return (
    <section className="relative">
      <div className="absolute top-0 left-0 size-full bg-dark opacity-0 vd-section-bg z-1" />

      <FirstVideo />
      <SecondVideo />
    </section>
  );
};

export default Videos;
