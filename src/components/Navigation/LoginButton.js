import { ArrowRightOnRectangleIcon, UserIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { AppContext } from "../../AppContext";
import { auth } from "../../firebase-config";

function LoginButton({
  setLoginModalToggle,
  setSideMenuToggle,
  sideMenuToggled,
}) {
  const { userLoggedIn, setUserLoggedIn } = useContext(AppContext);

  // Handle login/logout button click.
  const handleUserButtonClick = async () => {
    if (!userLoggedIn) {
      setLoginModalToggle(true);
      if (setSideMenuToggle) {
        setSideMenuToggle(false);
      }
    } else {
      try {
        await auth.signOut();
        setUserLoggedIn(false);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <button
      className={`${
        !sideMenuToggled ? "hidden" : "block"
      } md:block py-2 px-4 rounded-md hover:bg-black hover:bg-opacity-[0.15]`}
      onClick={handleUserButtonClick}
      title={userLoggedIn ? "Logout." : "Login"}
    >
      {userLoggedIn ? (
        <ArrowRightOnRectangleIcon className="text-white w-6" />
      ) : (
        <UserIcon className="text-white w-6" />
      )}
    </button>
  );
}

export default LoginButton;
