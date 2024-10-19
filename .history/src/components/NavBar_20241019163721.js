import React, {useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';

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
