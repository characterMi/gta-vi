import SideCharactersIntro from "../components/SideCharactersIntro";

const SideCharacters = () => {
  return (
    <section className="relative">
      <div
        className="fixed top-0 left-0 size-full blue-gradient-bg opacity-0 side-characters-section-bg -z-1 will-change-[opacity]"
        aria-hidden
      />

      <SideCharactersIntro />
    </section>
  );
};

export default SideCharacters;
