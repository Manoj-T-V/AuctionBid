import axios from 'axios';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;

const AuctionCreate = () => {
  // State to store form data
  const [auction, setAuction] = useState({
    title: '',
    description: '',
    startingBid: '',
    endDate: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form field changes
  const handleChange = (e) => {
    setAuction({
      ...auction,
      [e.target.name]: e.target.value,
    });
  };

  // Validate and handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const { title, description, startingBid, endDate } = auction;

    // Simple validation
    if (!title || !description || !startingBid || !endDate) {
      setError('Please fill in all fields.');
      return;
    }

    try{
         await axios.post(`${apiUrl}/api/auctions` , {title, description, startingBid, endDate}
            ,{headers: { Authorization: `Bearer ${token}` },}
         )
    setError('');
    setSuccess('Auction created successfully!');
    
    }
    catch(err){
        setError("Failed to create auction. Please try again.");
        console.error(err);
    }

    
    console.log('Auction Data:', auction);
  };

  return (
    <div className="auction-create-container">
      <h2>Create Auction</h2>
      <form onSubmit={handleSubmit} className="auction-form">
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>{success}</div>}
        
        <div className="form-group">
          <label htmlFor="title">Auction Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={auction.title}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={auction.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="startingBid">Starting Bid</label>
          <input
            type="number"
            id="startingBid"
            name="startingBid"
            value={auction.startingBid}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="endDate">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={auction.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="create-auction-button">
          Create Auction
        </button>
      </form>

      {/* Add some basic styles */}
      <style>{`
        .auction-create-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .auction-form .form-group {
          margin-bottom: 20px;
        }
        .auction-form label {
          display: block;
          margin-bottom: 8px;
        }
        .auction-form input,
        .auction-form textarea {
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .create-auction-button {
          display: inline-block;
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .create-auction-button:hover {
          background-color: #45a049;
        }
      `}</style>
    </div>
  );
};

export default AuctionCreate;
