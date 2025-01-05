import React from "react";
import { usePopUp } from "../PopUp/PopUp";

const SomeComponent = () => {
  const { openPopUp } = usePopUp();

  const handleClick = () => {
    openPopUp("This is a pop up message from SomeComponent!");
  };

  return (
    <div>
      <button onClick={handleClick}>Show Pop Up</button>
    </div>
  );
};

export default SomeComponent;
