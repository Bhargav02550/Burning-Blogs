import React, { useEffect, useState, useContext } from "react";
import "../../assets/scss/Auth.scss";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../ContextAPI/ContextAPI";
import { useLoading } from "../../ContextAPI/LoadingContext";
import Cookies from "js-cookie";

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login } = useContext(AppContext);
  const { setLoading } = useLoading();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await login(formData.email, formData.password);
    setLoading(false);
  };

  const handleformData = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isLoggedIn = () => {
    const userID = Cookies.get("UserID");
    if (userID) {
      navigate("/");
    }
  };

  useEffect(() => {
    isLoggedIn();
  }, [navigate]);

  return (
    <div className="page-center responsive-login">
      <h1 style={{ fontFamily: "Maleha", fontSize: "18px" }}>
        Log in to your account
      </h1>
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
              type={showPassword ? "text" : "password"}
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
            <div className="forgot-pass">Forgot password?</div>
            <button className="login-btn" type="submit">
              Log in
            </button>
          </div>
          <div className="signup-link">
            <span>
              No Account?{" "}
              <a
                href="/register"
                style={{
                  fontWeight: "bold",
                  color: "#3f51b5",
                  cursor: "pointer",
                }}
              >
                Create One
              </a>
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
