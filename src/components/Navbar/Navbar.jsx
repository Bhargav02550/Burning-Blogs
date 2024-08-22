import React from "react";
import "../../assets/scss/Navbar.scss";
import Header from "../Header/Header";

const Navbar = () => {
  return (
    <>
      <Header />
      <div className="Navbar">
        <text>
          {/* Startup Board<br></br> */}
          <large>Enjoy millions of discussions </large>
          <large>at your fingertips.</large>
          <br></br>
        </text>
      </div>
    </>
  );
};

export default Navbar;
