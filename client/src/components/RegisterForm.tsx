import React, { useState } from "react";

export const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: "",
    expansion: 0,
  });
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.name === "expansion"
          ? parseInt(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }

      setMessage("Account created successfully!");
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "0 auto", textAlign: "left" }}>
      <h2>Create Account</h2>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
      >
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
            minLength={3}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: "100%", padding: "0.5rem" }}
          />
        </div>
        <div>
          <label>Expansion:</label>
          <select
            name="expansion"
            value={formData.expansion}
            onChange={handleChange}
            style={{ width: "100%", padding: "0.5rem" }}
          >
            <option value={0}>Classic</option>
            <option value={1}>TBC</option>
            <option value={2}>WotLK</option>
            <option value={3}>Cataclysm</option>
          </select>
        </div>
        <button type="submit" style={{ padding: "0.75rem", cursor: "pointer" }}>
          Register
        </button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
