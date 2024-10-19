import React, { useEffect, useState } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL;
const Profile = () => {
  const [userAuctions, setUserAuctions] = useState([]);
  const [userBids, setUserBids] = useState([]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api//profile`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserAuctions(data.auctions);
        setUserBids(data.bids);
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div>
      <h2>My Auctions</h2>
      <ul>
        {userAuctions.map((auction) => (
          <li key={auction._id}>{auction.title}</li>
        ))}
      </ul>
      <h2>My Bids</h2>
      <ul>
        {userBids.map((bid) => (
          <li key={bid._id}>Auction: {bid.auctionTitle} - Bid: ${bid.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
