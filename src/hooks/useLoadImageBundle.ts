import { useEffect, useState } from "react";

export const useLoadImageBundle = (
  urls: string[],
  shouldLoad: boolean = true
) => {
  const [videos, setVideos] = useState<ImageBitmap[][]>([]);
  const [status, setStatus] = useState<ImageBundleLoaderStatus>("loading");

  useEffect(() => {
    if (!shouldLoad) return;

    const worker = new Worker("/workers/load-image-bundle.js");

    const onError = (error?: string) => {
      console.error(
        `Worker error: ${error} \n Couldn't load the ${urls.toString()} bundles \n Worker will be terminated.`
      );
      setStatus("error");
      worker.terminate();
    };

    worker.postMessage({ urls });

    worker.onmessage = (event) => {
      if (event.data.error) {
        onError(event.data.error);
        return;
      }

      setVideos(event.data.allFrames);
      setStatus("loaded");
      worker.terminate();
    };

    worker.onerror = (error) => {
      onError(error.message);
    };

    return () => {
      worker.terminate();
    };
  }, [shouldLoad]);

  return { videos, status };
};
