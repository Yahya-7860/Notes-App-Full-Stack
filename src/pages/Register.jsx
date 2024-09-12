import React, { useRef, useState } from "react";
import "../CSS Folder/Register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [userExist, setuserExist] = useState(false);

  const hchange = (e) => {
    const { id, value } = e.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    fetch("http://localhost:8000/user/register", options)
      .then((res) => res.json())
      .then((data) => {
        // console.log(data);
        setuserExist(false);
        if (data.message === "User already exist") {
          setuserExist(true);
        } else if (data.message === "User registered successfully") {
          const token = data.userData.token;
          const userId = data.userData._id;
          const username = data.userData.username;
          localStorage.setItem("token", token);
          localStorage.setItem("userId", userId);
          localStorage.setItem("username", username);
          navigate("/desktop");
        }
      });
  };

  return (
    <div className="register-container">
      <div className="register-form">
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={formData.username}
              onChange={hchange}
              required
            />
            {userExist ? (
              <span className="userExist">Username already Exist!</span>
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
              onChange={hchange}
              required
            />
          </div>
          <button type="submit" className="register-button">
            Register
          </button>
        </form>
        <p className="register-link">
          Already have account? <a href="/login">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
