import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const WatchTrailer = () => {
  useGSAP(() => {
    gsap.to(".watch-trailer-arrow", {
      y: "40%",
      scale: 0.9,
      opacity: 0.8,
      duration: 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);

  return (
    <div className="fixed bottom-[2%] translate-y-[2%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 lg:gap-[0.5vw]">
      <div className="watch-trailer">
        <svg
          aria-hidden
          fill="none"
          viewBox="-20 -17 230 162"
          xmlns="http://www.w3.org/2000/svg"
          className="w-32 lg:w-[10vw] stroke-white"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <defs>
            <filter
              id="drop-shadow-filter-0"
              colorInterpolationFilters="sRGB"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="10" />
              <feOffset dx="0" dy="0" />
              <feComponentTransfer result="offsetblur">
                <feFuncA id="spread-ctrl0" type="linear" slope="1" />
              </feComponentTransfer>
              <feFlood floodColor="#000" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter
              id="drop-shadow-filter-1"
              colorInterpolationFilters="sRGB"
              x="-50%"
              y="-50%"
              width="200%"
              height="200%"
            >
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" />
              <feOffset dx="0" dy="0" />
              <feComponentTransfer result="offsetblur">
                <feFuncA id="spread-ctrl1" type="linear" slope="0.5" />
              </feComponentTransfer>
              <feFlood floodColor="#fff" />
              <feComposite in2="offsetblur" operator="in" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <g filter="url(#drop-shadow-filter-0)">
            <g filter="url(#drop-shadow-filter-1)">
              <path
                d="M26.4874 45.0876L6.73309 4.22697H41.7481L59.9601 43.9604L60.4792 45.0876H67.1233L67.6423 43.9753L85.9433 4.22697H120.973L101.189 45.0876H105.876L127.706 0H83.2293L63.8012 42.2103L44.4621 0H0L21.801 45.0876H26.4874Z"
                fill="currentColor"
              />
              <path
                d="M84.9965 78.5314L63.8184 122.299L42.6552 78.5314H37.9687L63.8184 131.999L89.6978 78.5314H84.9965Z"
                fill="currentColor"
              />
              <path
                d="M134.945 45.0876V4.12315H171.176V45.0876H175.299V0H130.822V45.0876H134.945Z"
                fill="currentColor"
              />
              <path
                d="M171.176 78.5314V127.876H134.945V78.5314H130.822V131.999H175.299V78.5314H171.176Z"
                fill="currentColor"
              />
            </g>
          </g>
        </svg>

        <p className="text-white text-center text-xs lg:text-[1vw] uppercase tracking-[0.3rem] lg:tracking-[0.3vw] font-semibold abs-center !-translate-y-[115%] lg:!-translate-y-[110%] whitespace-nowrap">
          Watch Trailer 2
        </p>
      </div>

      <svg
        viewBox="0 0 34 14"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
        xmlnsXlink="http://www.w3.org/1999/xlink"
        className="watch-trailer-arrow w-8 lg:w-[2vw]"
      >
        <path
          d="M33.5609 1.54346C34.0381 2.5875 33.6881 3.87821 32.7791 4.42633L17.0387 13.9181L1.48663 4.42115C0.580153 3.86761 0.235986 2.57483 0.717909 1.53365C1.19983 0.492464 2.32535 0.097152 3.23182 0.650692L17.0497 9.08858L31.051 0.64551C31.96 0.0973872 33.0837 0.499411 33.5609 1.54346Z"
          fill="#ffb0c4"
        />
      </svg>
    </div>
  );
};

export default WatchTrailer;
