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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = await fetch(`http://localhost:8000/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
      //hello
    });
    setuserExist(false);

    if (userData.status == 401) {
      setuserExist(true);
    } else if (userData.status == 200) {
      navigate("/desktop");
    }
    // console.log("user data: ", userData);
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
      </div>
    </div>
  );
};

export default Register;
