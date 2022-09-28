import React, { useEffect, useState } from "react";
import { ArrowUpCircleIcon } from "@heroicons/react/24/outline";

function ScrollToTop({ mainSection, scrollToTop }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.screenY > mainSection.current.getBoundingClientRect().bottom) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });
  }, [mainSection]);

  return (
    <>
      {isVisible && (
        <ArrowUpCircleIcon
          className="fixed bottom-10 right-10 w-16 md:w-24 bg-white dark:bg-supper-black shadow-md border-[1px] border-supper-light-gray rounded-md p-4 text-supper-dark-gray dark:text-supper-light-gray hover:scale-105 cursor-pointer"
          onClick={() => scrollToTop(mainSection.current)}
          title="Scroll back to top."
        />
      )}
    </>
  );
}

export default ScrollToTop;
