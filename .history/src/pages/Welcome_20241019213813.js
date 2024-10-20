import React from 'react';
import { Link } from 'react-router-dom';
import successImage from '../assets/SiginSuccess.svg';
import styled from 'styled-components';

const StyledLink = styled(Link)`
  color: #FFFFFF;
  text-decoration: none;
  font-weight: bold;
  font-size: 16px;
  padding: 10px 20px;
  border: 2px solid transparent;
  border-radius: 5px;
  background: linear-gradient(79.69deg, #1D4ED8 -0.64%, #5AD7FE 107.84%);
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background: linear-gradient(79.69deg, #5AD7FE -0.64%, #1D4ED8 107.84%);
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
      <div style={{ textAlign: 'center', marginTop: '20px' ,  }}>
    <StyledLink to="/login">Login now</StyledLink>
  </div>
    </div>
  );
};

export default Welcome;