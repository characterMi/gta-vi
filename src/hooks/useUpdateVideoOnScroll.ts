import { useEffect, useRef } from "react";
import { lerp } from "../lib";
import type { useWindowSize } from "./useWindowSize";

type ObjectPosition = {
  x: number | number[];
  y: number | number[];
};

const getObjectPositionValue = ({
  objectPosition,
  progress,
}: {
  objectPosition: ObjectPosition;
  progress: number;
}) => {
  const calcPosition = (op: number | number[]) => {
    if (typeof op === "number") return op;

    const len = op.length - 1;
    const from = ~~(progress * len);
    const to = Math.min(from + 1, len);

    return lerp(op[from], op[to], progress * len - from);
  };

  return {
    x: calcPosition(objectPosition.x),
    y: calcPosition(objectPosition.y),
  };
};

export const useUpdateVideoOnScroll = (
  frames: ImageBitmap[],
  windowSize: ReturnType<typeof useWindowSize>,
  objectPosition: ObjectPosition
) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const context = useRef<CanvasRenderingContext2D>(null);

  const renderFrame = (progress: number) => {
    const img = frames?.[~~(progress * ((frames?.length || 1) - 1))];

    if (!img) return;

    const vw = windowSize.width;
    const vh = windowSize.height;

    const imgWidth = img.width;
    const imgHeight = img.height;

    const scale = Math.max(vw / imgWidth, vh / imgHeight);

    const sw = vw / scale;
    const sh = vh / scale;

    const { x: posX, y: posY } = getObjectPositionValue({
      objectPosition,
      progress,
    });

    const sx = Math.min(
      Math.max(0, imgWidth * posX - sw * posX),
      imgWidth - sw
    );
    const sy = Math.min(
      Math.max(0, imgHeight * posY - sh * posY),
      imgHeight - sh
    );

    context.current?.clearRect(0, 0, vw, vh);
    context.current?.drawImage(img, sx, sy, sw, sh, 0, 0, vw, vh);
  };

  useEffect(() => {
    if (!canvasRef.current) return;

    canvasRef.current.width = windowSize.width;
    canvasRef.current.height = windowSize.height;
  }, [windowSize]);

  useEffect(() => {
    context.current = canvasRef.current?.getContext("2d") ?? null;
  }, []);

  return {
    canvasRef,
    renderFrame,
  };
};
