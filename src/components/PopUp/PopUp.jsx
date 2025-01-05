import React, { createContext, useState, useContext } from "react";
import "./PopUp.scss";

const PopUpContext = createContext();

export const usePopUp = () => useContext(PopUpContext);

export const PopUpProvider = ({ children }) => {
  const [showPopUp, setShowPopUp] = useState(false);
  const [message, setMessage] = useState("");
  const [Component, setComponent] = useState(null);

  const openMessagePopUp = (msg) => {
    setMessage(msg);
    setComponent(null);
    setShowPopUp(true);
  };

  const openComponentPopUp = (Component) => {
    setMessage("");
    setComponent(() => Component);
    setShowPopUp(true);
  };

  const closePopUp = () => {
    setShowPopUp(false);
    setMessage("");
    setComponent(null);
  };

  return (
    <PopUpContext.Provider
      value={{
        showPopUp,
        message,
        Component,
        openMessagePopUp,
        openComponentPopUp,
        closePopUp,
      }}
    >
      {children}
      {showPopUp && (
        <PopUp message={message} Component={Component} onClose={closePopUp} />
      )}
    </PopUpContext.Provider>
  );
};

const PopUp = ({ message, Component, onClose }) => {
  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <span className="close-btn" onClick={onClose}>
          &times;
        </span>
        {message && <p>{message}</p>}
        {Component && <Component />}
      </div>
    </div>
  );
};

export default PopUp;
