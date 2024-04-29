import React, { useState } from "react";
import "../styles/Login.css";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import { Link } from "react-router-dom"; 
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
// import { Jwt } from "jsonwebtoken";
import { jwtDecode } from 'jwt-decode';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };

    const response = await fetch("http://localhost:3002/users/login", options);
    if (response.ok) {
      let token = await response.json();
      const decodedToken = jwtDecode(token);
      // console.log(decodedToken);

      Cookies.set("token", token, { secure: true, sameSite: "strict" });
      navigate("/pending-book-request");
      toast("login success");
    } else {
      console.error(response.error);
      toast(response.text());
    }

    // console.log('Form submitted:', formData);
  };

  return (
    <div className="login-bg-con">
      <h1>
        <FaSignInAlt /> Login{" "}
      </h1>
      <form className="login-form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="input-field"
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="input-field"
          required
        />

        <button type="submit" className="submit-button">
          Login
        </button>
        <p>
          Don't have an account?
          <Link className="link-to-signup" to="/signup">
            Click Here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
