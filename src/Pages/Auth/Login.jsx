import React, { useEffect, useState } from "react";
import "../../assets/scss/Auth.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/firebaseConfig";

const Login = () => {
  //Naviagation
  const navigate = useNavigate();

  //Hooks
  const [showPassword, setShowPassword] = useState(false);

  //Functions
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = { ...formData };

    try {
      const response = await signInWithEmailAndPassword(
        auth,
        bodyData.email,
        bodyData.password
      );
      document.cookie = `UserID=${response.user.uid};max-age=604800;path=/;secure;sameSite=strict`;
      // if (response.status === 201) {
      //
      navigate("/");
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleformData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isLoggedIn = () => {
    const isLoggedIn = !!localStorage.getItem("access_token");
    if (isLoggedIn) {
      navigate("/");
    }
  };

  useEffect(() => {
    isLoggedIn();
  });

  return (
    <>
      <div className="page-center">
        <h1 style={{ fontFamily: "MyFont" }}>Log in to your account</h1>
        <div className="form-card">
          <form onSubmit={handleSubmit}>
            <img src="./fire.png" height={"50px"} />
            <label className="input-label">
              <strong style={{ marginBottom: "2px" }}>Email</strong>
              <input
                name="email"
                type="text"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleformData}
              />
            </label>
            <label className="input-label">
              <strong style={{ marginBottom: "2px" }}>Password</strong>
              <input
                name="password"
                type={showPassword == true ? "text" : "password"}
                placeholder="**********"
                value={formData.password}
                onChange={handleformData}
              />
            </label>
            <div className="show-password">
              <input
                type="checkbox"
                style={{ height: "12px", width: "12px" }}
                onClick={() => setShowPassword(!showPassword)}
              />
              Show password
            </div>
            <div className="form-button">
              <div className="forgot-pass">Forgot your password?</div>
              <button className="login-btn" type="submit">
                Log in
              </button>
            </div>
            <div className="signup-link">
              <p>
                Don't have an account?{" "}
                <a
                  href="/register"
                  style={{ color: "#3f51b5", cursor: "pointer" }}
                >
                  Sign up
                </a>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
