import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css"; // optional, or reuse your existing CSS

const Navbar = ({ user, setUser }) => {
    return (
        <nav className="navbar">
            <ul className="nav-list">
                <li>
                    <Link to="/" className="nav-link">Home</Link>
                </li>
                <li>
                    {/* <Link to="/category" className="nav-link">Category</Link> */}
                </li>
                <li>
                    <Link to="/logout" className="nav-link">Logout</Link>
                </li>
                <li>
                    <Link to="/register" className="nav-link">Register</Link>
                </li>
            </ul>

            <div className="user">{user && `Hello, ${user?.username}`}</div>
            <div className="logout">
                {user && (
                    <Link to="/login" onClick={() => setUser(null)}>
                        Logout
                    </Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;