import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextWrapper = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  return (
    <AppContext.Provider value={{ userLoggedIn, setUserLoggedIn }}>
      {children}
    </AppContext.Provider>
  );
};
