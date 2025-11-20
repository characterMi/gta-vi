type Image = {
  src: string;
  alt: string;
  width: number;
  height: number;
  objectPosition: string;
};

type ImageBundleLoaderStatus = "loading" | "error" | "loaded";
