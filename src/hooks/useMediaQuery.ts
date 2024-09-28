import { useState, useEffect } from "react";

interface UseMediaQueryProps {
  size?: string;
}

const useMediaQuery = ({ size }: UseMediaQueryProps): boolean => {
  const [matches, setMatches] = useState<boolean>(
    typeof window !== "undefined"
      ? window.matchMedia(`(min-width: ${size ?? "768px"})`).matches
      : true
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQueryList = window.matchMedia(
        `(min-width: ${size ?? "768px"})`
      );
      const listener = (e: MediaQueryListEvent) => setMatches(e.matches);

      mediaQueryList.addEventListener("change", listener);
      return () => mediaQueryList.removeEventListener("change", listener);
    }
  }, [size]);

  return matches;
};

export default useMediaQuery;
