import { createContext, useContext, useState } from "react";

const AppContext = createContext();

const MyContextProvider = ({ children }) => {
  const myData = "Hello from Context!";

  return <AppContext.Provider>{children}</AppContext.Provider>;
};

export default MyContextProvider;
