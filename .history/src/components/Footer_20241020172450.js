import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background-color: #aeb1b5;
  padding: 40px 0;
  text-align: center;
  border-top: 1px solid #e9ecef;

  .footer-links {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 20px;
  }

  a {
    text-decoration: none;
    color: #007bff;
    font-size: 1rem;
  }

  a:hover {
    color: #0056b3;
  }

  .social-icons {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-bottom: 20px;

    i {
      font-size: 1.5rem;
      color: #333;
    }

    i:hover {
      color: #007bff;
    }
  }

  .footer-text {
    color: #555;
    font-size: 0.9rem;
    margin-bottom: 0;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/about">About</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <div className="social-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook"></i>
        </a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </a>
      </div>

      <p className="footer-text">&copy; 2024 BidNow. All rights reserved.</p>
    </FooterContainer>
  );
};

export default Footer;
