import React from 'react';
import { Link } from 'react-router-dom';
import successImage from '../assets/SiginSuccess.svg';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: #007BFF;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  border: 2px solid #007BFF;
  border-radius: 5px;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #007BFF;
    color: #FFFFFF;
  }
`;

const Welcome = () => {
  const randomImage = 'https://source.unsplash.com/random'; // Replace with your desired image source

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Uncover Deals, Unleash Excitement: Dive into Our Auctions Today!</h1>
      <img src={successImage} alt="Success illustration" style={{ width: '58%' }} />
      <br />
      <br />
      <div className="link-container">
    <Link to="/login" className="styled-link">Login now</Link>
      </div>
    </div>
  );
};

export default Welcome;