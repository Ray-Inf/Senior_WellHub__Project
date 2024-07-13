import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "./LoginSignup.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/login/",
        {
          username,
          password,
        },
        { headers: { "Content-Type": "application/json" } }
      );
      if (response.data.token) {
        localStorage.setItem("patientId", response.data.PatientId);
        localStorage.setItem("token", response.data.token);
        console.log(response.data.token);
        console.log(response.data.PatientId);
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-form">
        <h1 className="auth-heading">Login</h1>
        {error && <p className="error">{error}</p>}
        <form method="POST" onSubmit={handleSubmit}>
          <input type="hidden" name="_method" value="POST" />
          <div className="input-group">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              required
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <button type="submit" className="auth-btn">
            Login
          </button>
        </form>
        <p className="auth-link">
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};export default Login;
