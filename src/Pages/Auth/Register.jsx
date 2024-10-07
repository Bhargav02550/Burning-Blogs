import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../../configs/firebaseConfig";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/scss/Auth.scss";
import axios from "axios";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [enablePasswordStrength, setEnablePasswordStrength] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [passwordConstrains, setPasswordConstrains] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSymbol: false,
    hasLength: false,
  });

  const RegisterUser = async () => {
    try {
      const firebaseUser = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_LOCAL}/register`,
        {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          password: form.password,
          userid: firebaseUser.user.uid,
        }
      );
      if (response.status === 201 && firebaseUser) {
        navigate("/");
        document.cookie = `UserID=${firebaseUser.user.uid};max-age=604800;path=/;secure;sameSite=strict`;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordConstrains = (e) => {
    const { value } = e.target;

    setPasswordConstrains({
      hasLowercase: /[a-z]/.test(value),
      hasUppercase: /[A-Z]/.test(value),
      hasNumber: /[0-9]/.test(value),
      hasSymbol: /[^a-zA-Z0-9]/.test(value),
      hasLength: value.length >= 8,
    });
  };

  const [form, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = form;

    try {
      setIsLoading(true);

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userAccessToken = userCredential.user.uid;
      document.cookie = `UserID=${userAccessToken};max-age=604800;path=/;secure;sameSite=strict`;
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_API_LOCAL + "/user_register",
        {
          email: form.email,
          password: form.password,
          firstname: form.firstName,
          lastname: form.lastName,
          userid: userAccessToken,
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="page-center">
        <h1 style={{ fontFamily: "MyFont" }}>Register to Burn Blogs</h1>
        <div
          className="form-card"
          style={isLoading ? { opacity: 0.5 } : { opacity: 1 }}
        >
          <form onSubmit={handleSubmit}>
            <img src="./fire.png" height={"50px"} />
            <label className="input-label">
              <strong style={{ marginBottom: "2px" }}>First Name</strong>
              <input
                type="text"
                name="firstName"
                required="required"
                value={form.firstName}
                onChange={handleForm}
                placeholder="First Name"
              />
            </label>
            <label className="input-label">
              <strong style={{ marginBottom: "2px" }}>Last Name</strong>
              <input
                type="text"
                name="lastName"
                required="required"
                value={form.lastName}
                onChange={handleForm}
                placeholder="Last Name"
              />
            </label>
            <label className="input-label">
              <strong style={{ marginBottom: "2px" }}>Email</strong>
              <input
                type="text"
                name="email"
                required="required"
                value={form.email}
                onChange={handleForm}
                placeholder="Email"
              />
            </label>
            <label className="input-label">
              <strong style={{ marginBottom: "2px" }}>Password</strong>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required="required"
                minLength={8}
                value={form.password}
                onChange={(e) => {
                  handleForm(e);
                  handlePasswordConstrains(e);
                  setEnablePasswordStrength(true);
                }}
                placeholder="Password"
              />
            </label>
            {enablePasswordStrength && (
              <div className="password-strength">
                <ul>
                  <li
                    style={
                      passwordConstrains.hasLength
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    Password must be at least 8 characters long
                  </li>
                  <li
                    style={
                      passwordConstrains.hasLowercase
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    Password must contain at least one lowercase letter
                  </li>
                  <li
                    style={
                      passwordConstrains.hasUppercase
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    Password must contain at least one uppercase letter
                  </li>
                  <li
                    style={
                      passwordConstrains.hasNumber
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    Password must contain at least one number
                  </li>
                  <li
                    style={
                      passwordConstrains.hasSymbol
                        ? { color: "green" }
                        : { color: "red" }
                    }
                  >
                    Password must contain at least one special character
                  </li>
                </ul>
              </div>
            )}
            <label className="input-label">
              <strong style={{ marginBottom: "2px" }}>Re-Type Password</strong>
              <input
                type={showPassword == true ? "text" : "password"}
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleForm}
                placeholder="Re-Type Password"
              />
            </label>
            <div className="form-button">
              <div className="show-password">
                <input
                  type="checkbox"
                  style={{ height: "12px", width: "12px" }}
                  onClick={() => setShowPassword(!showPassword)}
                />
                Show password
              </div>
              <button className="login-btn" type="submit">
                Register
              </button>
            </div>

            <div className="signup-link">
              <p>
                Have an existing account?{" "}
                <a
                  href="/login"
                  style={{ color: "#3f51b5", cursor: "pointer" }}
                >
                  Sign In
                </a>
              </p>
            </div>
          </form>
          {isLoading && (
            <div className="loader-overlay">
              <div className="load"></div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
