import React from "react";
import { NavLink } from "react-router-dom";

const CustomNavbar = ({ logUser }) => {
  return (
    <nav className="custom-navbar">
      <NavLink to="/" >
        Wallet Watcher
      </NavLink>
      <ul>
        {logUser ? (
          <li>
            <NavLink to="/dashboard" >
              Dashboard
            </NavLink>
          </li>
        ) : (
          <li className="nav-item">
            <NavLink to="/login">
              Login
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default CustomNavbar;
