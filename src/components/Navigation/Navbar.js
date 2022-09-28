import {
  Bars3Icon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";
import LoginButton from "./LoginButton";

function Navbar(props) {
  return (
    <nav className="w-full flex items-center justify-between gradient px-8 py-4 box-border">
      <div className="flex items-center">
        <img
          className="w-10 object-contain overflow-hidden mr-4"
          src={require("../../images/supper.png")}
          alt="Supper logo"
        ></img>
        <h1 className="text-white font-bold text-xl cursor-default mr-2">
          supper.
        </h1>
        <div className="hidden md:flex items-center justify-center mx-2">
          <button
            className="py-2 px-4 rounded-md mx-2 hover:bg-black hover:bg-opacity-[0.15]"
            onClick={() =>
              props.handleNavClick(document.querySelector("#events-section"))
            }
          >
            <h1 className="text-white">events</h1>
          </button>
          <button
            className="py-2 px-4 rounded-md mx-2 hover:bg-black hover:bg-opacity-[0.15]"
            onClick={() =>
              props.handleNavClick(document.querySelector("#about-section"))
            }
          >
            <h1 className="text-white">people</h1>
          </button>
          <button
            className="py-2 px-4 rounded-md mx-2 hover:bg-black hover:bg-opacity-[0.15]"
            onClick={() =>
              props.handleNavClick(document.querySelector("#partners-section"))
            }
          >
            <h1 className="text-white">partners</h1>
          </button>
        </div>
      </div>
      <div className="flex justify-center items-center">
        <LoginButton setLoginModalToggle={props.setLoginModalToggle} />
        <button
          className="hidden md:block py-2 px-4 rounded-md hover:bg-black hover:bg-opacity-[0.15]"
          onClick={props.handleModeToggle}
          title="Toggle between Light/Dark Mode."
        >
          {props.mode === "light" ? (
            <SunIcon className="text-white w-6" />
          ) : (
            <MoonIcon className="text-white w-6" />
          )}
        </button>

        <button
          className="hamburger md:hidden py-2 px-4 rounded-md hover:bg-black hover:bg-opacity-[0.15]"
          onClick={props.handleClick}
        >
          <Bars3Icon className=" hamburger text-white w-6" />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
