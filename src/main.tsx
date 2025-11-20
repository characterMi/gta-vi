import ReactLenis from "lenis/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import WindowSizeContextProvider from "./providers/WindowSizeContext";

import "./index.css";
import GetMainVideosContextProvider from "./providers/GetMainVideosContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReactLenis
      root
      options={{
        syncTouch: true,
        touchMultiplier: 0.8,
        overscroll: false,
      }}
    >
      <WindowSizeContextProvider>
        <GetMainVideosContextProvider>
          <App />
        </GetMainVideosContextProvider>
      </WindowSizeContextProvider>
    </ReactLenis>
  </StrictMode>
);
