import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;

const MyBids = () => {
  const [userBids, setUserBids] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserBids = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/bids/my`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserBids(data);
      } catch (error) {
        setError('Failed to fetch bids.');
      }
    };
    fetchUserBids();
  }, []);

  return (
    <div>
      <h2>My Bids</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {userBids.map((bid) => (
          <li key={bid._id}>
            <p>Auction: {bid.auctionTitle} - Bid Amount: ${bid.amount}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBids;
