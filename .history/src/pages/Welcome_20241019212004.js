import React from 'react';
import { Link } from 'react-router-dom';
import '../'

const Welcome = () => {
  const randomImage = 'https://source.unsplash.com/random'; // Replace with your desired image source

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Uncover Deals, Unleash Excitement: Dive into Our Auctions Today!</h1>
      <img src='' alt="Success illustration" style={{ width: '300px' }} />
      <p>SIGNED UP SUCCESSFULLY!</p>
      <Link to="/login">Login now</Link>
    </div>
  );
};

export default Welcome;