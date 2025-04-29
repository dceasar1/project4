import React, { useState } from 'react';
import './login.css'; // Assuming your custom CSS is in this file
import { useNavigate } from 'react-router-dom';

function Login({ setUser }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setError('Please fill in all fields.');
      return;
    }

    console.log("Sending login request with:", username, password);

    fetch("http://localhost:5000/auth/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
    .then(async (res) => {
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      alert("Login successful!");
      setUser(data.user);
      setUsername('');
      setPassword('');
      navigate("/");
    })
    .catch((err) => {
      console.error("Login error:", err.message);
      setError(err.message);
    });
  };

  return (
    <div className="wrapper">
      <div className="form-header">
        <div className="titles">
          <div className="title-login">
            <h2>Login</h2>
          </div>
        </div>
      </div>
      
      {/* Start form */}
      <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
        {/* Username input */}
        <div className="input-box">
          <input 
            type="text" 
            className="input-field" 
            id="log-username" 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            autoComplete="username"
          />
          <label htmlFor="log-username" className="label">Username</label>
        </div>

        {/* Password input */}
        <div className="input-box">
          <input 
            type="password" 
            className="input-field" 
            id="log-pass" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <label htmlFor="log-pass" className="label">Password</label>
        </div>
        <br />

        {/* Display error if any */}
        {error && <div className="error-message">{error}</div>}

        {/* Forgot password link */}
        <div className="form-cols">
          <div className="col-1"></div>
          <div className="col-2"></div>
          <a href="#">Forgot password?</a>
        </div>

        {/* Sign In button */}
        <div className="input-box">
          <button type="submit" className="btn-submit" id="SignInBtn">
            Sign In <i className='bx bx-log-in'></i>
          </button>
        </div>

        {/* Switch form link for registration */}
        <div className="switch-form">
          <span>Don't have an account? <a href="./register">Register</a></span>
        </div>
      </form>
    </div>
  );
}

export default Login;
