const Description = () => {
  const titleFontSize =
    Math.min(window.innerWidth / 10, window.innerHeight / 10) + "px";
  const descriptionFontSize =
    Math.min(window.innerWidth / 22, window.innerHeight / 22) + "px";

  return (
    <div className="absolute top-0 left-0 w-full h-full description-container overflow-hidden will-change-[mask-image]">
      <div
        className="max-w-[80%] sm:max-w-[70%] description gradient-title flex flex-col justify-center h-full mx-auto text-left leading-[1.8]"
        style={{ textTransform: "none" }}
      >
        <h2 className="font-black" style={{ fontSize: titleFontSize }}>
          Vice City, USA.
        </h2>
        <p className="leading-[1.2]" style={{ fontSize: descriptionFontSize }}>
          Jason and Lucia have always known the deck is stacked against them.
          But when an easy score goes wrong, they find themselves on the darkest
          side of the sunniest place in America, in the middle of a criminal
          conspiracy stretching across the state of Leonida — forced to rely on
          each other more than ever if they want to make it out alive.
        </p>
      </div>
    </div>
  );
};

export default Description;
