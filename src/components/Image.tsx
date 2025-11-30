import { useState } from "react";
import { twMerge } from "tailwind-merge";

const Image = ({
  containerClassName,
  src,
  alt,
  className,
  ...imageProps
}: ImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className={twMerge(
        "relative overflow-hidden bg-neutral-800",
        containerClassName
      )}
    >
      {!isLoaded && src.blur && (
        <img
          src={src.blur}
          alt=""
          aria-hidden
          className={twMerge("size-full object-cover", className)}
        />
      )}

      <img
        loading="lazy"
        {...imageProps}
        src={src.desktop}
        alt={alt}
        srcSet={`${src.mobile} 768w, ${src.desktop} 1440w`}
        sizes="100vw"
        className={twMerge("abs-full object-cover z-1", className)}
        decoding="async"
        draggable={false}
        onLoad={(e) => {
          if (e.currentTarget.complete) {
            setIsLoaded(true);
          }
        }}
      />
    </div>
  );
};

export default Image;
