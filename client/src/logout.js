import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './logout.css';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear any stored auth tokens (e.g., localStorage)
    localStorage.removeItem('token');
    localStorage.removeItem('user');

    // Redirects to login page
    navigate('/login');
  }, [navigate]);

  return (
    <div>
      <h2>You have been logged out.</h2>
    </div>
  );
};

export default Logout;
