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
  const api_url = import.meta.env.VITE_BACKEND_API_ONLINE + "/get_user_byuid";

  //Placeholders
  const profilePlaceholder = "./profile-placeholder.jpg";


  //Hooks
  const [loginToggle, setLoginToggle] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [profilePicture, setProfilePicture] = useState(profilePlaceholder);
  const dropdownRef = useRef(null);

  //Navigation
  const navigate = useNavigate();
  const currentPage = window.location.pathname;

  //Context
  const { logout, UserID } = useContext(AppContext);

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

  useEffect(() => {
    const fetchProfilePicture = async () => {
      if (UserID) {
        try {
          const response = await fetch(api_url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uid: UserID }),
          });
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();
          console.log(data);
          if (data && data.profile_picture) {
            setProfilePicture(data.profile_picture);
          }
        } catch (error) {
          console.error("Error fetching profile picture:", error);
        }
      }
    };

    fetchProfilePicture();
  }, [UserID]);

  const handleLogout = async () => {
    await logout();
    setLoginToggle(false);
    setDropdownOpen(false);
  };

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
            src={profilePicture}
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
