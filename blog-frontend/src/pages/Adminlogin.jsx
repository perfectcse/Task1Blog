import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        console.error("❌ Login error:", data);
        setError(data.error || "Login failed");
        return;
      }

      // ✅ Save JWT token
      localStorage.setItem("token", data.token);

      // ✅ Clear error & redirect
      setError("");
      navigate("/admin/dashboard");
    } catch (err) {
      console.error("❌ Network error:", err);
      setError("Server error. Try again later.");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Admin Login</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{
            display: "block",
            marginBottom: "10px",
            width: "100%",
            padding: "8px",
          }}
        />

        <button
          type="submit"
          style={{
            background: "#2d6a4f",
            color: "white",
            padding: "10px",
            width: "100%",
            border: "none",
            cursor: "pointer",
          }}
        >
          Login
        </button>
      </form>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
    </div>
  );
};

export default AdminLogin;