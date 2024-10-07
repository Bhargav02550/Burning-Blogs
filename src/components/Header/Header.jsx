import React, { useEffect, useState } from "react";
import "../../assets/Scss/Header.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../assets/scss/Post.scss";
import debounce from "lodash/debounce";
import { FaRegPenToSquare } from "react-icons/fa6";
import { LiaEdit } from "react-icons/lia";
import Cookies from "js-cookie";

const Header = () => {
  //Backend URL
  const api_url = "http://localhost:4050/api/logout";

  //Placeholders
  const profilePlaceholder = "./profile-placeholder.jpg";

  //User's info
  const userid = Cookies.get("UserID");

  console.log(userid);

  const profilePicture = "./profile.jpg";

  //Hooks
  const [loginToggle, setLoginToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  //Navigation
  const navigate = useNavigate();
  const currentPage = window.location.pathname;

  //Functions
  useEffect(() => {
    const handleResize = debounce(() => {
      setWidth(window.innerWidth);
    }, 100);

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // const handleLogout = async () => {
  //   const access_token = localStorage.getItem("access_token");
  //   console.log("access token", access_token);
  //   try {
  //     const resp = await axios.post(
  //       api_url,
  //       { access_token },
  //       {
  //         headers: {
  //           "Content-type": "application/json",
  //         },
  //       }
  //     );
  //     if (resp.status === 200) {
  //       localStorage.removeItem("access_token");
  //       setLoginToggle(false);
  //     }
  //   } catch (err) {
  //     console.log("Something went wrong", err);
  //   }
  // };

  // const handleLogin = () => {
  //   navigate("/login");
  // };

  useEffect(() => {
    if (userid && Cookies.get("UserID") != null) {
      setLoginToggle(true);
    }
  });

  return (
    <div className="Header">
      <div className="Header-logo" onClick={() => navigate("/")}>
        Burning Blogs
      </div>
      <div style={{ color: "black" }}>{width}</div>
      {/* <button
        className="Header-logout-btn"
        onClick={loginToggle ? handleLogout : handleLogin}
      >
        {loginToggle ? "Logout" : "Login"}
      </button> */}
      <div className="Header-Right-Part">
        {currentPage !== "/login" && currentPage !== "/new-burn" && (
          <button
            className="Header-Write-btn"
            onClick={() => navigate("/new-burn")}
          >
            Write
          </button>
        )}
        <img
          src={userid ? profilePicture : profilePlaceholder}
          alt="Profile"
          width={32}
          height={32}
          style={{ borderRadius: "50%" }}
        />
      </div>
    </div>
  );
};

export default Header;
