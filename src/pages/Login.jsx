import React, { useState } from "react";
import "../CSS Folder/Login.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [response, setResponse] = useState({
    notFound: false,
    incPsw: false,
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    };

    fetch(`http://localhost:8000/user/login`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setResponse({ ...response, notFound: false, incPsw: false });
        if (data.Message === "User not found") {
          setResponse({ ...response, notFound: true, incPsw: false });
        } else if (data.Message === "Incorrect Password") {
          setResponse({ ...response, incPsw: true, notFound: false });
        } else {
          const token = data.token;
          const userId = data.userId;
          const username = data.username;
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("username", username);
          navigate("/desktop");
        }
      });
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
            {response.notFound ? (
              <span className="userNotFound">Invalid Username!</span>
            ) : (
              <span></span>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {response.incPsw ? (
              <span className="WrongPass">Incorrect Password!</span>
            ) : (
              <span></span>
            )}
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        <p className="register-link">
          New user? <a href="/register">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
