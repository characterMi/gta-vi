import ReactLenis from "lenis/react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

import "./index.css";

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
      <App />
    </ReactLenis>
  </StrictMode>
);
