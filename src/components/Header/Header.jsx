import React, { useEffect, useState } from "react";
import "../../assets/Scss/Header.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/scss/Post.scss";
import debounce from "lodash/debounce";

const Header = () => {
  const api_url = "http://localhost:4050/api/logout";
  const [loginToggle, setLoginToggle] = useState(false);
  const navigate = useNavigate();
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = debounce(() => {
      setWidth(window.innerWidth);
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleLogout = async () => {
    const access_token = localStorage.getItem("access_token");
    console.log("access token", access_token);
    try {
      const resp = await axios.post(
        api_url,
        { access_token },
        {
          headers: {
            "Content-type": "application/json",
          },
        }
      );
      if (resp.status === 200) {
        localStorage.removeItem("access_token");
        setLoginToggle(false);
      }
    } catch (err) {
      console.log("Something went wrong", err);
    }
  };

  const handleLogin = () => {
    navigate("/login");
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") != null) {
      setLoginToggle(true);
    }
  });

  return (
    <div className="Header">
      <div className="Header-logo">StartupBoard.com</div>
      {/* <button
        className="Header-logout-btn"
        onClick={loginToggle ? handleLogout : handleLogin}
      >
        {loginToggle ? "Logout" : "Login"}
      </button> */}
      {width}
      <img
        src="../profile.jpg"
        alt="Profile"
        width={32}
        height={32}
        style={{ borderRadius: "50%" }}
      />
    </div>
  );
};

export default Header;
