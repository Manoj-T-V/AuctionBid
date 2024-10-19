import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AuctionItem from './pages/AuctionItem';
import Profile from './pages/Profile';
import Register from './pages/Register';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { createGlobalStyle } from 'styled-components';
import Footer from './components/Footer';
import Welcome from './pages/Welcome';
import 

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    background-color: #F9F9F9;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    margin: 0;
    font-weight: bold;
    color: #333;
  }

  button {
    background-color: #007BFF;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 15px;
    font-size: 1rem;
    cursor: pointer;
  }

  button:hover {
    background-color: #0056b3;
  }

  input {
    padding: 10px;
    border: 1px solid #DDD;
    border-radius: 4px;
    font-size: 1rem;
    width: 100%;
    margin-bottom: 15px;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .page-title {
    text-align: center;
    margin: 20px 0;
    font-size: 2rem;
    color: #444;
  }
`;

function App() {
  return (
    <Router>
      <GlobalStyle />
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/auction/:id" element={<AuctionItem />} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/Welcome" element={<Welcome />} />
          <Route path="/Welcome" element={< />} />
        </Routes>
        <Footer></Footer>
      </div>
    </Router>
  );
}

export default App;
