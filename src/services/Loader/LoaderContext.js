import React, { createContext, useContext, useEffect, useState } from "react";
import Loader from "./Loader";

const LoaderContext = createContext();

export const LoaderProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    isLoading
      ? document.body.classList.add("stop-scrolling-custom-class")
      : document.body.classList.remove("stop-scrolling-custom-class");
  }, [isLoading]);

  return (
    <LoaderContext.Provider value={setIsLoading}>
      {children}
      <Loader display={isLoading ? "flex" : "none"} />
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const setIsLoading = useContext(LoaderContext);
  if (setIsLoading === undefined) {
    throw new Error(
      "Error in LoaderContex.js try to use LoaderContext within wrapper"
    );
  }
  return setIsLoading;
};
