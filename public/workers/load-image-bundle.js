const _UINT32 = 4;

self.addEventListener("message", async ({ data: { urls } }) => {
  if (!Array.isArray(urls)) {
    self.postMessage({ error: "urls must be an array!" });
    return;
  }

  try {
    const promises = urls.map(async (url) => {
      const buffer = await (await fetch(url)).arrayBuffer();
      const view = new DataView(buffer);

      let offset = 0;
      const frameCount = view.getUint32(offset);
      offset += _UINT32;

      const frameBlobs = [];

      for (let i = 0; i < frameCount; i++) {
        const imageSize = view.getUint32(offset);
        offset += _UINT32;

        const bytes = buffer.slice(offset, offset + imageSize);
        offset += imageSize;

        frameBlobs.push(new Blob([bytes]));
      }

      const frames = await Promise.all(
        frameBlobs.map((blob) => createImageBitmap(blob))
      );

      return frames;
    });

    const allFrames = await Promise.all(promises);

    self.postMessage({ allFrames }, allFrames.flat());
  } catch (err) {
    self.postMessage({ error: err.message });
  }
});
