import React from 'react'
import { useNavigate } from "react-router-dom";

const Welcome = () => {
    return (
      <div>
        <h1>Uncover Deals, Unleash Excitement: Dive into Our Auctions Today!</h1>
        <img src="path/to/your/image.jpg" alt="Success illustration" />
        <p>SIGNED UP SUCCESSFULLY!</p>
        <Link to="/login">Login now</Link>
      </div>
    );
  };

export default Welcome
