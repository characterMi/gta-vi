const Description = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full description-container">
      <div className="max-w-[80%] sm:max-w-[60%] description gradient-title flex flex-col justify-center gap-6 h-full mx-auto text-left">
        <h2 className="text-2xl xs:text-3xl sm:text-4xl md:text-7xl lg:text-[6vw] font-black">
          Vice City, USA.
        </h2>
        <p className="text-sm xs:text-base sm:text-lg md:text-2xl lg:text-[1.5vw]">
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
