import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { FaUserCircle } from 'react-icons/fa';  

const Nav = styled.nav`
  background-color: #fff;
  padding: 15px 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    color: #007BFF;
  }

  .nav-links {
    display: flex;
    gap: 20px;
    align-items: center;
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

  button {
    background-color: #FF6B6B;
    padding: 8px 16px;
    border-radius: 20px;
  }

  .profile-icon {
    font-size: 2rem;
    cursor: pointer;
    color: #333;
  }

  .dropdown {
    position: absolute;
    top: 60px;
    right: 20px;
    background-color: white;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    min-width: 150px;
    padding: 10px;
    z-index: 100;

    a {
      padding: 10px;
      color: #333;
    }

    a:hover {
      background-color: #f1f1f1;
    }
  }
`;



const Navbar = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };
  const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
      };
  const handleRegister = () => {
    navigate('/register');
  }

  return (
    <Nav>
      <div className="logo">BidNow</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        
        {localStorage.getItem('token') ? (
          <>
          <FaUserCircle className="profile-icon" onClick={toggleDropdown} />

            {showDropdown && (
              <div className="dropdown">
                <Link to="/profile">Profile</Link>
                <Link to="/my-bids">My Bids</Link>
                <Link to="/my-actions">My Actions</Link>
                <button onClick={handleLogout}>Logout</button>
              </div>
            )}
        <button onClick={handleLogout}>Logout</button>
        </>
        ) : (
          <>
          <Link to="/login">Login</Link>
          <button onClick={handleRegister}>Get Started</button>
          </>
        )}
      </div>
    </Nav>
  );
};

export default Navbar;
