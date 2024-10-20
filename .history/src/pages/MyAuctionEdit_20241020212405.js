import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import useErrorHandler from '../components/ErrorHandler.js';

const apiUrl = process.env.REACT_APP_API_URL;

const AuctionEdit = () => {
    useErrorHandler();
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState({
    title: "",
    description: "",
    startingBid: "",
    endDate: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/auctions/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        // Format the date for the input
        const formattedEndDate = data.endDate.split("T")[0];
        setAuction({ ...data, endDate: formattedEndDate });
      } catch (error) {
        setError("Failed to fetch auction.");
      }
    };
    fetchAuction();
  }, [id]);

  const handleChange = (e) => {
    
    setAuction({
      ...auction,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e
    const { title, description, startingBid, endDate } = auction;

    // Simple validation
    if (!title || !description || !startingBid || !endDate) {
      setError('Please fill in all fields.');
      return;
    }

    const today = new Date();
  const endDateDate = new Date(endDate);

  if (endDateDate <= today) {
    setError('End date must be in the future.');
    return;
  }

    // Convert startingBid to a number and perform additional validation
    const startingBidNumber = parseFloat(startingBid);
    const maxBid = 10000000; // ₹1 crore limit

    if (isNaN(startingBidNumber) || startingBidNumber <= 0) {
      setError('Starting bid must be a positive number.');
      return;
    }

    if (startingBidNumber > maxBid) {
      setError(`Starting bid cannot exceed ₹1 crore (${maxBid.toLocaleString()}).`);
      return;
    }

    try {
      await axios.put(`${apiUrl}/api/auctions/${id}`, auction, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate("/myauctions");
    } catch (error) {
      setError("Failed to update auction.");
    }
  };

  return (
    <div className="auction-edit-container">
      <h2>Edit Auction</h2>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Title</label>
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

        <button type="submit" className="save-button">Save Changes</button>
      </form>

      {/* Add some basic styles */}
      <style>{`
        .auction-edit-container {
          max-width: 500px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .form-group {
          margin-bottom: 20px;
        }
        .form-group label {
          display: block;
          margin-bottom: 8px;
        }
        .form-group input, 
        .form-group textarea {
          width: 100%;
          padding: 10px;
          border-radius: 4px;
          border: 1px solid #ddd;
        }
        .save-button {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .save-button:hover {
          background-color: #45a049;
        }
        .error {
          color: red;
          margin-bottom: 10px;
        }
      `}</style>
    </div>
  );
};

export default AuctionEdit;
