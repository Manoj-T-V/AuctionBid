import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const AuctionEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [auction, setAuction] = useState({ title: "", description: "", startingBid: "", endDate: "" });
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/auctions/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        setAuction(data);
      } catch (error) {
        setError('Failed to fetch auction.');
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
    e.preventDefault();
    try {
      await axios.put(`${apiUrl}/api/auctions/${id}`, auction, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      navigate('/my-auctions');
    } catch (error) {
      setError('Failed to update auction.');
    }
  };

  return (
    <div>
      <h2>Edit Auction</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={auction.title}
          onChange={handleChange}
        />
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={auction.description}
          onChange={handleChange}
        />
        <label htmlFor="startingBid">Starting Bid</label>
        <input
          type="number"
          id="startingBid"
          name="startingBid"
          value={auction.startingBid}
          onChange={handleChange}
        />
        <label htmlFor="endDate">End Date</label>
        <input
          type="date"
          id="endDate"
          name="endDate"
          value={auction.endDate}
          onChange={handleChange}
        />
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default AuctionEdit;
