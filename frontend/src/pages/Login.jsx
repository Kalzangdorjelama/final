import "../login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ setIsAuthenticated, setRole }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.username === "admin" && formData.password === "admin") {
      setIsAuthenticated(true);
      setRole("admin");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", "admin");
      navigate("/home");
    } else if (formData.username === "user" && formData.password === "user") {
      setIsAuthenticated(true);
      setRole("user");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("role", "user");
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
      <h2 style={{ color: "black" }}>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          required
          style={{ width: "350px", padding: "13px" }}
        />
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          required
          style={{ width: "350px", padding: "13px" }}
        />
        <button type="submit" style={{ width: "100%" }}>
          Login
        </button>
      </form>
      {error && <p style={{ color: "black" }}>{error}</p>}
    </div>
  );
}

export default Login;
