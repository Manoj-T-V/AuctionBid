import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Bids.css"; // Import the CSS file for styling
import useErrorHandler from '../components/ErrorHandler.js';

const apiUrl = process.env.REACT_APP_API_URL;

const MyBids = () => {
    useErrorHandler();
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
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('token');
            localStorage.removeItem('name');
            localStorage.removeItem('email');
            // Navigate to login page (adjust as needed)
            window.location.href = '/login';
          }
        setError('Failed to fetch bids.');
      }
    };
    fetchUserBids();
  }, []);

  if (!userBids) {
    return <div>Loading...</div>;
  }

  return (
    <div className="my-bids-container">
      <h2 style={{}}>My Bids</h2>
      {error && <div className="error-message">{error}</div>}
      <table className="bids-table">
        <thead>
          <tr>
            <th>Auction Item</th>
            <th>Bid Amount</th>
            <th>Auction End Date</th>
            <th>Your Bid Date</th>
          </tr>
        </thead>
        <tbody>
          {userBids.map((bid) => (
            <tr key={bid._id}>
              <td>
                <Link to={`/auction/${bid.auctionItem._id}`} className="auction-link">
                  {bid.auctionItem.title}
                </Link>
              </td>
              <td>${bid.amount}</td>
              <td>{new Date(bid.auctionItem.endDate).toLocaleString()}</td>
              <td>{new Date(bid.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyBids;
