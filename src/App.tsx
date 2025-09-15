import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

const App = () => {
  return (
    <ReactLenis root>
      <main className="size-screen">
        <h1 className="text-6xl text-white">GTA VI</h1>
      </main>
    </ReactLenis>
  );
};

export default App;
