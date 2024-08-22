import React, { useEffect, useState } from "react";
import "../../assets/scss/Auth.scss";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const api_url = "http://localhost:4050/api/user_login";
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bodyData = { ...formData };

    try {
      const response = await axios.post(api_url, bodyData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response);
      if (response.status === 201) {
        window.localStorage.setItem("access_token", response.data.access_token);
        navigate("/posts");
      }
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
      navigate("/posts");
    }
  };

  useEffect(() => {
    isLoggedIn(); // checking if the user is logged in and navigate him to the dashboard
  });

  return (
    <>
      <div className="page-center">
        <h1>Log in to your account</h1>
        <div className="form-card">
          <form onSubmit={handleSubmit}>
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
                type="password"
                placeholder="**********"
                value={formData.password}
                onChange={handleformData}
              />
            </label>
            <div className="form-button">
              <div className="forgot-pass">Forgot your password?</div>
              <button className="login-btn" type="submit">
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
