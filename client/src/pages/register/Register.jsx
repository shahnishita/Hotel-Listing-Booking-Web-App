import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { API_URL } from "../../API_URL";
import { AuthContext } from "../../context/AuthContext";
import "./register.css";

const Register = () => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleClick = async (e) => {
    e.preventDefault(); // prevent form reload

    try {
      dispatch({ type: "REGISTER_START" });

      const res = await axios.post(`${API_URL}/auth/register`, credentials);

      dispatch({ type: "REGISTER_SUCCESS", payload: res.data });

      console.log("Response:", res.data);

      navigate("/login"); // redirect after signup
    } catch (err) {
      dispatch({ type: "REGISTER_FAILURE", payload: err.response?.data });
      console.log("Error:", err.response?.data || err.message);
    }
  };

  return (
    <div className="mainContainer">
      <div className="contentArea">
        <div className="right">
          <h1>Create Account</h1>
          <p>Create your own personal account with your details.</p>

          <form>
            <input
              type="text"
              placeholder="Username"
              id="name"
              onChange={handleChange}
            />

            <input
              type="email"
              placeholder="Email"
              id="email"
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Password"
              id="password"
              onChange={handleChange}
            />

            <button disabled={loading} onClick={handleClick}>
              Sign Up
            </button>

            {error && <span>{error.message}</span>}
          </form>
        </div>

        <div className="left">
          <h1>Hello There!</h1>
          <p>To keep connected with us please login with your personal info</p>

          <span>Already have an account?</span>
          <Link to="/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
