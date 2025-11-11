import { useContext } from "react";
import { WindowSizeContext } from "../constants";

export const useWindowSize = () => useContext(WindowSizeContext);
