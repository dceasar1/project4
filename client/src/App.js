import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Login from './login';
import HomePage from './HomePage';
import Register from './register';
import Logout from './logout';
import Navbar from './navbar';

function App() {
  const [user, setUser] = useState(null);

  const location = useLocation();
  const hideNavbarOnRoutes = ['/login', '/register'];

  const shouldShowNavbar = !hideNavbarOnRoutes.includes(location.pathname);

  return (
    <div>
      {shouldShowNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/" element={<HomePage user={user} setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

export default App;
