import { useEffect, useState } from "react";

export function useMediaQuery(query: `(${string})`): boolean {
  const [mediaQuery] = useState(window.matchMedia(query));
  const [matches, setMatches] = useState<boolean>(mediaQuery?.matches ?? false);

  useEffect(() => {
    const handler = (event: MediaQueryListEvent) => setMatches(event.matches);
    // Adding the ? for browser support
    mediaQuery.addEventListener?.("change", handler);

    return () => {
      mediaQuery.removeEventListener?.("change", handler);
    };
  }, [mediaQuery]);

  return matches;
}
