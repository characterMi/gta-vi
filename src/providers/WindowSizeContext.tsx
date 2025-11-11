import { useCallback, useEffect, useState } from "react";
import { WindowSizeContext } from "../constants";

const WindowSizeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
    aspectRatio: window.innerWidth / window.innerHeight,
  });

  const setNewWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
      aspectRatio: window.innerWidth / window.innerHeight,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("orientationchange", setNewWindowSize);
    window.addEventListener("resize", setNewWindowSize);

    return () => {
      window.removeEventListener("orientationchange", setNewWindowSize);
      window.removeEventListener("resize", setNewWindowSize);
    };
  }, [setNewWindowSize]);

  return (
    <WindowSizeContext.Provider value={{ ...windowSize, setNewWindowSize }}>
      {children}
    </WindowSizeContext.Provider>
  );
};

export default WindowSizeContextProvider;
