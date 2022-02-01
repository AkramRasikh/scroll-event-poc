import React from "react";

const usePageMidpoint = () => {
  const initialScrollY = window.scrollY;
  const [scrollYState, setScrollYState] = React.useState(initialScrollY);

  const onScroll = () => {
    setScrollYState(window.scrollY);
  };

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return scrollYState;
};

export default usePageMidpoint;
