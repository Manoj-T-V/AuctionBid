import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const { data } = await axios.get("/api/auctions");
        setAuctions(data);
      } catch (error) {
        console.error("Error fetching auctions", error);
      }
    };
    fetchAuctions();
  }, []);

  return (
    <div>
      <h2>Auction Items</h2>
      <ul>
        {auctions.map((auction) => (
          <li key={auction._id}>
            <Link to={`/auction/${auction._id}`}>
              {auction.title} - Current Bid: ${auction.highestBid || auction.startingBid}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
