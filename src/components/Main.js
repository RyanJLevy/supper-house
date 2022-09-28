import React, { useRef, useState } from "react";
import About from "./About/About";
import Events from "./Events/Events";
import Footer from "./Footer";
import LoginModal from "./Navigation/LoginModal";
import Navbar from "./Navigation/Navbar";
import ScrollToTop from "./Navigation/ScrollToTop";
import Sidebar from "./Navigation/Sidebar";
import Partnerships from "./Partnerships/Partnerships";

function Main() {
  // Dialogues, modals, etc. toggle state.
  const [sideMenuToggled, setSideMenuToggle] = useState(false);
  const [loginModalToggled, setLoginModalToggle] = useState(false);

  const HandleMenuClick = () => {
    setSideMenuToggle((prevState) => !prevState);
  };
  // Website theme.
  const [mode, setMode] = useState("light");
  const HandleModeToggle = () => {
    document.documentElement.classList.toggle("dark");
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  // Section scrolling.
  const topSectionRef = useRef();

  const scrollToSection = (element) => {
    window.scrollTo({
      top: element.offsetTop,
      behavior: "smooth",
    });
    setSideMenuToggle(false);
  };

  return (
    <main className="w-full h-full relative dark:bg-supper-black">
      {/* Conditional rendering of mobile menu. */}
      {sideMenuToggled && (
        <div className=" z-[99] absolute top-0 left-0 bottom-0 right-0 min-w-[100vw] min-h-[100vh] bg-black bg-opacity-25"></div>
      )}
      {sideMenuToggled && (
        <Sidebar
          scrollToSection={scrollToSection}
          setSideMenuToggle={setSideMenuToggle}
          menuToggled={sideMenuToggled}
          mode={mode}
          handleModeToggle={HandleModeToggle}
          setLoginModalToggle={setLoginModalToggle}
        />
      )}
      {/* Conditional rendering of login modal. */}
      {loginModalToggled && <LoginModal setToggle={setLoginModalToggle} />}
      <Navbar
        handleClick={HandleMenuClick}
        handleNavClick={scrollToSection}
        mode={mode}
        handleModeToggle={HandleModeToggle}
        setLoginModalToggle={setLoginModalToggle}
      />
      <LandingBanner topSectionRef={topSectionRef} />
      <Events />
      <About />
      <Partnerships />
      <ScrollToTop mainSection={topSectionRef} scrollToTop={scrollToSection} />
      <Footer />
    </main>
  );
}

// Small component for landing page banner with welcome text.
function LandingBanner({ topSectionRef }) {
  return (
    <div
      className="w-full flex flex-col items-center justify-between py-12"
      ref={topSectionRef}
    >
      <h1 className="title-text text-center">welcome home.</h1>
    </div>
  );
}

export default Main;
