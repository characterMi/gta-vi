import { useLenis } from "lenis/react";

const Navbar = () => {
  const lenis = useLenis();

  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center md:p-16 p-5 z-10">
      {/* LOGO */}
      <button
        className="group outline-none cursor-pointer"
        aria-label="Return to top"
        onClick={() => lenis?.scrollTo(0)}
      >
        <svg
          width="2.5rem"
          className="w-10 fill-white group-hover:fill-yellow group-focus-visible:fill-yellow transition-[fill]"
          aria-hidden
          viewBox="0 0 46 35"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M46.2661 0.800781H34.7236V34.4008H46.2661V0.800781Z" />
          <path d="M33.9162 0.800781L17.3358 34.4008L0.776855 0.800781H12.3139L17.3332 11.5445L22.3766 0.800781H33.9162Z" />
        </svg>
      </button>

      {/* Menu */}
      <button
        className="group outline-none cursor-pointer"
        aria-label="Open the sidebar"
      >
        <svg
          width="2.5rem"
          className="w-10 fill-white group-hover:fill-yellow group-focus-visible:fill-yellow transition-[fill]"
          viewBox="0 0 450 450"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="344" height="75" transform="translate(53 120)" />
          <rect width="344" height="75" transform="translate(53 120)" />
          <rect width="344" height="75" transform="translate(53 255)" />
          <rect width="344" height="75" transform="translate(53 255)" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
