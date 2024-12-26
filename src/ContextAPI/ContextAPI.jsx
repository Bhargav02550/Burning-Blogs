import { createContext, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../configs/firebaseConfig";

const AppContext = createContext();

const MyContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const UserID = Cookies.get("UserID");

  const register = async (email, password, firstname, lastname,profile_picture) => {
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userAccessToken = userCredential.user.uid;
      const response = await axios.post(
        import.meta.env.VITE_BACKEND_API_LOCAL + "/user_register",
        {
          email,
          password,
          firstname,
          lastname,
          userid: userAccessToken,
          profile_picture,
        }
      );
      setUser(response.data);
      Cookies.set("UserID", userAccessToken);
      toast.success("Registration Successful");
      navigate("/");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        toast.error("User already exists");
      } else {
        toast.error("Registration error: " + error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_API_ONLINE}/user_login`,
        {
          email,
          password,
        }
      );
      setUser(response.data);
      Cookies.set("UserID", response.data.access_token);
      toast.success("Login Successful");
      setTimeout(() => navigate("/"), 1000);
    } catch (err) {
      setError("Invalid email or password");
      console.log(err);
      toast.error(err.response.data.message, {
        style: {
          border: "1px solid rgba(112, 112, 112, 0.29)",
          padding: "5px",
          color: "black",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      if (Cookies.get("UserID") === null) {
        throw new Error("User is not logged in");
      }
      await axios.post(`${import.meta.env.VITE_BACKEND_API_ONLINE}/logout`, {
        access_token: Cookies.get("UserID"),
      });
      setUser(null);
      Cookies.remove("UserID");
      toast.success("Logout Successful");
      setTimeout(() => navigate("/login"), 1000);
    } catch (err) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{ user, loading, error, register, login, logout, UserID }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext };
export default MyContextProvider;
