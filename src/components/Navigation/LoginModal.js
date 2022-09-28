import React, { useState } from "react";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { auth } from "../../firebase-config";
import { useContext } from "react";
import { AppContext } from "../../AppContext";

function LoginModal({ setToggle }) {
  const { setUserLoggedIn } = useContext(AppContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleToggleShowPassword = () => {
    setPasswordVisible((prev) => !prev);
  };

  const handleUserLogin = async (event) => {
    event.preventDefault();
    console.log("Signing in.");
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        userEmail,
        userPassword
      );
      setUserLoggedIn(true);
      setToggle(false);
      console.log("user is signed in", user);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="absolute z-[99] top-0 left-0 bottom-0 right-0 min-w-[100vw] min-h-[100vh] bg-black bg-opacity-40 flex justify-center p-40">
      <dialog className="flex flex-col w-[75%] md:w-[55%] lg:w-[35%] bg-white dark:bg-supper-black rounded-bl-xl rounded-tr-xl items-center py-8">
        <XCircleIcon
          className="w-8 absolute top-3 right-4 text-supper-dark-gray hover:text-supper-pink p-1 py-0 rounded-sm cursor-pointer dark:text-supper-pink dark:hover:text-supper-light-gray hover:text-opacity-70"
          onClick={() => setToggle(false)}
        />
        <h1 className="text-3xl md:text-5xl text-supper-dark-gray dark:text-supper-light-gray">
          user login
        </h1>
        <form
          className="flex flex-col items-center space-y-4 p-4 w-full"
          onSubmit={handleUserLogin}
        >
          <input
            className="border-[1px] dark:border-supper-light-gray border-supper-dark-gray py-1 px-2 rounded-md dark:text-supper-light-gray text-supper-dark-gray dark:bg-supper-black bg-white placeholder:text-supper-light-gray dark:placeholder:text-supper-dark-gray w-full md:w-[60%]"
            type="text"
            onChange={(e) => setUserEmail(e.target.value)}
            placeholder="email@example.com"
          ></input>
          <div className="w-full md:w-[60%] relative flex items-center justify-center p-0">
            {passwordVisible ? (
              <EyeSlashIcon
                className="w-4 absolute right-4 text-supper-dark-gray hover:text-supper-pink cursor-pointer dark:text-supper-pink dark:hover:text-supper-light-gray hover:text-opacity-70"
                title="Hide password."
                onClick={handleToggleShowPassword}
              />
            ) : (
              <EyeIcon
                className="w-4 absolute right-4 text-supper-dark-gray hover:text-supper-pink cursor-pointer dark:text-supper-pink dark:hover:text-supper-light-gray hover:text-opacity-70"
                title="Show password."
                onClick={handleToggleShowPassword}
              />
            )}
            <input
              className="w-full border-[1px] dark:border-supper-light-gray border-supper-dark-gray py-1 px-2 rounded-md dark:text-supper-light-gray text-supper-dark-gray dark:bg-supper-black bg-white placeholder:text-supper-light-gray dark:placeholder:text-supper-dark-gray"
              type={passwordVisible ? "text" : "password"}
              onChange={(e) => setUserPassword(e.target.value)}
              placeholder="password"
            ></input>
          </div>
          <button
            type="submit"
            onClick={handleUserLogin}
            className="border-[1px] dark:border-supper-light-gray border-supper-dark-gray px-8 py-2 dark:text-supper-light-gray text-supper-dark-gray rounded-md hover:bg-supper-light-gray hover:bg-opacity-20 w-full md:w-[60%]"
          >
            login
          </button>
        </form>
        <div className="flex justify-center items-center space-x-1 py-4 mt-2 border-t-[1px] border-t-supper-light-gray w-full md:w-[60%]">
          <p className="text-supper-dark-gray dark:text-supper-light-gray text-xs md:text-sm p-0">
            want an account?
          </p>
          <p className="text-supper-pink cursor-pointer text-xs md:text-sm p-0">
            create an account!
          </p>
        </div>
      </dialog>
    </div>
  );
}

export default LoginModal;
