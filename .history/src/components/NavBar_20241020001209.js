import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa'; // Import the user icon

const Nav = styled.nav`
  background-color: #ffe6f2;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #007BFF;
    display: flex;
    align-items: center;
  }

  .nav-links {
    display: flex;
    gap: 20px;
  }

  a {
    text-decoration: none;
    color: #333;
    font-size: 1rem;
    padding: 10px;
  }

  a:hover {
    color: #007BFF;
  }

  .profile-section {
    position: relative;
  }

  .profile-icon {
    cursor: pointer;
    font-size: 2rem;
  }

  .dropdown {
    position: absolute;
    width: max-content;
    top: 100%;
    right: 0;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    display: ${({ showDropdown }) => (showDropdown ? 'block' : 'none')};
    padding: 5px;
  }

  .dropdown a {
    display: block;
    text-decoration: none;
    color: #333;
  }

  .dropdown a:hover {
    background-color: #f0f0f0;
  }
`;

const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/register');
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <Nav showDropdown={showDropdown}>
      <div className="logo">
        <img src="/logo.png" alt="Logo" style={{ height: '30px', marginRight: '10px' }} />
        Genix Auctions
      </div>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/auctions">Auctions</Link>
        <Link to="/bidding">Bidding</Link>
        <Link to="/about">About us</Link>
        
      </div>

      {localStorage.getItem('token') ? (
        <div className="profile-section">
          <FaUserCircle className="profile-icon" onClick={toggleDropdown} />
          <div className="dropdown">
            <Link to="/profile">Profile</Link>
            <Link to="/myauctions">My Auctions</Link>
            <Link to="/mybids">My Bids</Link>
            <Link to="" onClick={handleLogout}>Logout</Link>
          </div>
        </div>
      ) : (
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <button onClick={handleRegister}>Get Started</button>
        </div>
      )}
    </Nav>
  );
};

export default Navbar;
