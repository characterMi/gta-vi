type ImageBundleLoaderStatus = "loading" | "error" | "loaded";

type ImageProps = Omit<
  React.ComponentProps<"img">,
  "src" | "alt" | "srcSet" | "sizes"
> & {
  src: {
    blur?: string;
    mobile: string;
    desktop: string;
  };
  alt: string;
  containerClassName?: string;
};

type CharacterImageProps = {
  width: number;
  height: number;
  objectPosition: string;
} & ImageProps;
