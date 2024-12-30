import React, { useContext, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../assets/scss/Header.scss";
import { useNavigate } from "react-router-dom";
// import "../../assets/scss/Post.scss";
import debounce from "lodash/debounce";
import { AppContext } from "../../ContextAPI/ContextAPI";
import axios from "axios";

const Header = () => {
  //Backend URL
  const api_url = import.meta.env.VITE_BACKEND_API_ONLINE + "/get_user_byuid";

  //Placeholders
  const profilePlaceholder = "./profile-placeholder.jpg";

  //Hooks
  const [loginToggle, setLoginToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profilePlaceholder);
  const [showHeader, setShowHeader] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  //Navigation
  const navigate = useNavigate();
  const currentPage = window.location.pathname;

  //Context
  const { logout, UserID, user } = useContext(AppContext);

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

  const handleLogout = async () => {
    await logout();
    setLoginToggle(false);
    setDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        profileRef.current &&
        !profileRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleScroll = () => {
    if (window.scrollY < lastScrollY) {
      setShowHeader(true);
    } else {
      setShowHeader(false);
      setDropdownOpen(false);
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const handleProfileClick = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div
      className="Header"
      style={{
        position: currentPage === "/new-burn" ? "fixed" : "fixed",
        top: showHeader ? "0" : currentPage === "/new-burn" ? "0" : "-57px",
        width: "100%",
        transition: "top 0.3s",
      }}
    >
      <div className="Header-logo" onClick={() => navigate("/")}>
        Burning Blogs
      </div>
      {/* <div style={{ color: "black" }}>{width}</div> */}
      <div className="Header-Right-Part">
        <>
          {currentPage !== "/new-burn" && (
            <button
              className="Header-Write-btn"
              onClick={() => navigate("/new-burn")}
            >
              Write
            </button>
          )}
          {currentPage !== "/login" && currentPage !== "/register" && (
            <>
              {!UserID && (
                <div className="Auth-Buttons">
                  <button
                    className="btn-signup"
                    name="signUpBtn"
                    id="signUpBtn"
                    onClick={() => navigate("/register")}
                  >
                    Sign Up
                  </button>
                  <button
                    className="btn-signin"
                    name="loginBtn"
                    id="loginBtn"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </button>
                </div>
              )}
            </>
          )}
          <div className="Profile-Dropdown" ref={profileRef}>
            {user && (
              <img
                src={user.profile_picture}
                alt={`${user.firstname} ${user.lastname}`}
                width={32}
                height={32}
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={handleProfileClick}
              />
            )}
            {!user && (
              <img
                src={profilePlaceholder}
                alt="Profile"
                width={32}
                height={32}
                style={{
                  borderRadius: "50%",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
                onClick={handleProfileClick}
              />
            )}
          </div>
        </>
      </div>
      {dropdownOpen &&
        UserID &&
        ReactDOM.createPortal(
          <div className="Dropdown-Menu-Outside" ref={dropdownRef}>
            <button onClick={handleLogout}>Logout</button>
          </div>,
          document.getElementById("dropdown-container")
        )}
    </div>
  );
};

export default Header;
