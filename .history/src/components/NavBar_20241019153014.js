import React from 'react';
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
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <Nav>
      <div className="logo">BidNow</div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
        if(localStorage.getItem('token')){
        <button onClick={handleLogout}>Logout</button>
        }
        else{
          <button onClick={handleLogout}>Logout</button>
        }
      </div>
    </Nav>
  );
};

export default Navbar;
