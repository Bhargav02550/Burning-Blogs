import React, { useContext, useEffect, useState, useRef } from "react";
import ReactDOM from "react-dom";
import "../../assets/scss/Header.scss";
import { useNavigate } from "react-router-dom";
import "../../assets/scss/Post.scss";
import debounce from "lodash/debounce";
import Cookies from "js-cookie";
import { AppContext } from "../../ContextAPI/ContextAPI";

const Header = () => {
  //Backend URL
  const api_url = "http://localhost:4050/api/logout";

  //Placeholders
  const profilePlaceholder = "./profile-placeholder.jpg";

  //User's info
  const userid = Cookies.get("UserID");

  const profilePicture = "./profile.jpg";

  //Hooks
  const [loginToggle, setLoginToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  //Navigation
  const navigate = useNavigate();
  const currentPage = window.location.pathname;

  //Context
  const { logout } = useContext(AppContext);

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

  const handleLogin = () => {
    navigate("/login");
  };

  const myData = useContext(AppContext);

  useEffect(() => {
    if (userid && Cookies.get("UserID") != null) {
      setLoginToggle(true);
    }
  }, [userid]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="Header">
      <div className="Header-logo" onClick={() => navigate("/")}>
        Burning Blogs
      </div>
      <div style={{ color: "black" }}>{width}</div>
      <div className="Header-Right-Part">
        {currentPage !== "/login" && currentPage !== "/new-burn" && (
          <button
            className="Header-Write-btn"
            onClick={() => navigate("/new-burn")}
          >
            Write
          </button>
        )}
        <div className="Profile-Dropdown">
          <img
            src={userid ? profilePicture : profilePlaceholder}
            alt="Profile"
            width={32}
            height={32}
            style={{ borderRadius: "50%", cursor: "pointer" }}
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
        </div>
      </div>
      {dropdownOpen &&
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
