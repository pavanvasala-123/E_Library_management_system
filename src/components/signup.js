import React, { useState } from 'react';
import '../styles/signup.css'; 
import {toast} from 'react-toastify'
import { FaUser } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const SignupForm = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    role: 'User',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();

    let options = { method: 'POST',headers: {'Content-Type': 'application/json'},body: JSON.stringify(formData),}

        const response = await fetch('http://localhost:3002/users/signup',options);
        if(response.ok){
            const message = await response.text()
            toast(message)
            navigate('/login')
        }else{
            console.error( response.error);
            toast(response.text())
        }
    
        // console.log('Form submitted:', formData);
  };

  return (
    <div className='signu-bg-con'>
        <h1><FaUser/> Register </h1>
    <form className="signup-form" onSubmit={handleSubmit}>
      <label htmlFor="firstname">First Name:</label>
      <input
        type="text"
        id="firstname"
        name="firstname"
        value={formData.firstname}
        onChange={handleChange}
        className="input-field"
        required
      />

      <label htmlFor="lastname">Last Name:</label>
      <input
        type="text"
        id="lastname"
        name="lastname"
        value={formData.lastname}
        onChange={handleChange}
        className="input-field"
        required
      />

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

      <label htmlFor="role">Role:</label>
      <select
        id="role"
        name="role"
        value={formData.role}
        onChange={handleChange}
        className="select-field"
      >
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <button type="submit" className="submit-button">
        Sign Up
      </button>
    </form>
    </div>
  );
};

export default SignupForm;
