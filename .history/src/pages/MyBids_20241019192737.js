import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const apiUrl = process.env.REACT_APP_API_URL;

const MyBids = () => {
  const [userBids, setUserBids] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUserBids = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/bids/mybids`, {
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

  if (!userBids) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>My Bids</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {userBids.map((bid) => (
          <li key={bid._id}>
            <p><Link to={`/auction/${bid.auctionItem._id}`}>{bid.auctionItem.title}</Link></p>
            <p>Bid Amount: ${bid.amount}</p>
            <p>Auction End Date: {new Date(bid.auctionItem.endDate).toLocaleString()}</p>
            <p>Auction End Date: {new Date(bid.auctionItem.endDate).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyBids;
