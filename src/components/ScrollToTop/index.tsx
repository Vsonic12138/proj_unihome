'use client';

import { useEffect, useState } from "react";

type ScrollToTopProps = {
  label: string;
};

export default function ScrollToTop({ label }: ScrollToTopProps) {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.pageYOffset > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed right-8 bottom-8 z-99">
      {isVisible && (
        <button
          type="button"
          onClick={scrollToTop}
          aria-label={label}
          className="bg-primary/80 hover:shadow-signUp flex h-10 w-10 cursor-pointer items-center justify-center rounded-md text-white shadow-md transition duration-300 ease-in-out focus:outline-hidden focus:ring-2 focus:ring-white/70 focus-visible:outline-hidden"
        >
          <span className="mt-[6px] h-3 w-3 rotate-45 border-t border-l border-white"></span>
        </button>
      )}
    </div>
  );
}
