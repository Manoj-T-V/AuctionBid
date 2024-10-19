import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../styles/Login.css'; // Import the CSS file for styling

const apiUrl = process.env.REACT_APP_API_URL;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      console.log('Login successful:', response.data);
      const token = response.data.token;
      localStorage.setItem('token', token);
      navigate('/tasks');
    } catch (error) {
      console.error("Error while logging in:", error);
    }
  };

  return (
    <div className="login-container">
      <div className="login-wrapper">
        <div className="login-card">
          <h2>Login</h2>
          <p>Welcome back. Enter your credentials to access your account.</p>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="hello@example.com"
                required
              />
            </div>
            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                required
              />
            </div>
            <button type="submit">Continue</button>
          </form>
          <p>or sign up with</p>
          <div className="social-login">
            <button className="google-login">Google</button>
            <button className="apple-login">Apple</button>
            <button className="facebook-login">Facebook</button>
          </div>
          <p>Don't have an account? <Link to="/signup">Sign up here</Link></p>
        </div>
        <div className="login-image">
          <img src="https://source.unsplash.com/random?login" alt="Login illustration" />
        </div>
      </div>
    </div>
  );
}

export default LoginPage;