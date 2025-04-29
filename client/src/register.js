import React, { useState } from 'react';
import './register.css';
import { useNavigate } from 'react-router-dom';

const Register = ({setUser}) => {
  const [form, setForm] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    termsAccepted: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));

    
    setErrors((prev) => ({
      ...prev,
      [name]: '',
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = 'Username is required';
    if (!form.password) newErrors.password = 'Password is required';
    if (form.password !== form.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';
    if (!form.termsAccepted) newErrors.termsAccepted = 'You must accept the terms';
    return newErrors;
  };
const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
      return;
    }

    // Submit the data to backend
    console.log('Registering user:', form);

    // You'd replace this with an API POST request in production
    fetch("http://localhost:5000/auth/register", {method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: form.username,
        password: form.password,
      }),
    }).then(res => res.json()).then(data => {
      alert("User registered successfully!")
     setUser(data.user)
      setForm({ 
        username: '',
        password: '',
        confirmPassword: '',
        termsAccepted: false,
      });
      navigate('/') 

  })
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
          />
          {errors.username && <span className="error">{errors.username}</span>}
        </div>

        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && <span className="error">{errors.password}</span>}
        </div>

        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword}</span>
          )}
        </div>

        <div className={`checkbox-container ${errors.termsAccepted ? 'error-box' : ''}`}>
          <input
            type="checkbox"
            name="termsAccepted"
            checked={form.termsAccepted}
            onChange={handleChange}
          />
          <label>I accept the Terms and Conditions</label>
          {errors.termsAccepted && (
            <span className="error">{errors.termsAccepted}</span>
          )}
        </div>

        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
