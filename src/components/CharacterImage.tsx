import { twMerge } from "tailwind-merge";
import Image from "./Image";

const CharacterImage = ({
  width,
  height,
  objectPosition,
  className,
  ...imgProps
}: CharacterImageProps) => {
  const svgSize = width / 15 + "vw";

  return (
    <button
      className={twMerge("bg-yellow group outline-none", className)}
      style={{ width: width + "vw", height: height + "vw" }}
      aria-label="Click to view full image"
    >
      <div className="relative size-full group-active:scale-[0.97] group-focus-visible:scale-[0.97] md:group-hover:scale-[0.97] transition-transform duration-700 ease-in-out cursor-zoom-in">
        <Image
          {...imgProps}
          containerClassName="size-full"
          style={{ ...imgProps.style, objectPosition: objectPosition }}
        />

        <span
          aria-hidden
          className="absolute rounded-full bg-purple-dark group-active:bg-yellow group-focus-visible:bg-yellow transition-all duration-300"
          style={{
            padding: width / 17 + "vw",
            bottom: width / 17 + "vw",
            right: width / 17 + "vw",
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="fill-yellow group-active:fill-purple-dark group-focus-visible:fill-purple-dark transition-colors duration-300"
            style={{
              width: svgSize,
              height: svgSize,
            }}
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M15 4C14.4477 4 14 3.55228 14 3C14 2.44772 14.4477 2 15 2H21C21.5523 2 22 2.44772 22 3V9C22 9.55228 21.5523 10 21 10C20.4477 10 20 9.55228 20 9V5.41421L14.7071 10.7071C14.3166 11.0976 13.6834 11.0976 13.2929 10.7071C12.9024 10.3166 12.9024 9.68342 13.2929 9.29289L18.5858 4H15ZM9.29289 13.2929C9.68342 12.9024 10.3166 12.9024 10.7071 13.2929C11.0976 13.6834 11.0976 14.3166 10.7071 14.7071L5.41421 20H9C9.55228 20 10 20.4477 10 21C10 21.5523 9.55228 22 9 22H3C2.44772 22 2 21.5523 2 21V15C2 14.4477 2.44772 14 3 14C3.55228 14 4 14.4477 4 15V18.5858L9.29289 13.2929Z"
            ></path>
          </svg>
        </span>
      </div>
    </button>
  );
};

export default CharacterImage;
