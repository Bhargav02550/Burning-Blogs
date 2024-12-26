import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/scss/Auth.scss";
import { useContext } from "react";
import { AppContext } from "../../ContextAPI/ContextAPI";

const RegisterPage = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const profile_images = ["p1.jpg", "p2.jpg", "p3.jpg", "p4.jpg", "p5.jpg"];

  const [enablePasswordStrength, setEnablePasswordStrength] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [passwordConstrains, setPasswordConstrains] = useState({
    hasLowercase: false,
    hasUppercase: false,
    hasNumber: false,
    hasSymbol: false,
    hasLength: false,
  });

  const { register } = useContext(AppContext);

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

  const [selectedProfileImage, setSelectedProfileImage] = useState("");

  const handleProfileImageSelect = (image) => {
    setSelectedProfileImage(image);
  };

  const handleForm = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await register(form.email, form.password, form.firstName, form.lastName, selectedProfileImage);
    setIsLoading(false);
  };

  const allConstraintsSatisfied =
    Object.values(passwordConstrains).every(Boolean);

  return (
    <>
      <div className="page-center">
        <h1 style={{ fontFamily: "MyFont" }}>Register to Burn Blogs</h1>
        <div
          className="form-card"
          style={isLoading ? { opacity: 0.5 } : { opacity: 1 }}
        >
          <form onSubmit={handleRegister}>
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
            {enablePasswordStrength && !allConstraintsSatisfied && (
              <div className="password-strength">
                <ul style={{ margin: "0" }}>
                  {!passwordConstrains.hasLength && (
                    <li style={{ color: "red" }}>
                      Password must be at least 8 characters long
                    </li>
                  )}
                  {!passwordConstrains.hasLowercase && (
                    <li style={{ color: "red" }}>
                      Password must contain at least one lowercase letter
                    </li>
                  )}
                  {!passwordConstrains.hasUppercase && (
                    <li style={{ color: "red" }}>
                      Password must contain at least one uppercase letter
                    </li>
                  )}
                  {!passwordConstrains.hasNumber && (
                    <li style={{ color: "red" }}>
                      Password must contain at least one number
                    </li>
                  )}
                  {!passwordConstrains.hasSymbol && (
                    <li style={{ color: "red" }}>
                      Password must contain at least one special character
                    </li>
                  )}
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
            <label className="input-label">
              <strong style={{ marginBottom: "2px" }}>Profile Picture</strong>
              <div className="profile-images">
                {profile_images.map((image) => (
                  <img
                    key={image}
                    src={`./${image}`}
                    alt="Profile"
                    className={`profile-image ${selectedProfileImage === image ? "selected" : ""}`}
                    onClick={() => handleProfileImageSelect(image)}
                  />
                ))}
              </div>
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
