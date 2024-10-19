import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const AuctionItem = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState({});
  const [bid, setBid] = useState("");

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const { data } = await axios.get(`/api/auctions/${id}`);
        setAuction(data);
      } catch (error) {
        console.error("Error fetching auction", error);
      }
    };
    fetchAuction();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/auctions/${id}/bid`, { bid });
      setAuction((prevAuction) => ({
        ...prevAuction,
        highestBid: bid,
      }));
    } catch (error) {
      console.error("Error placing bid", error);
    }
  };

  return (
    <div>
      <h2>{auction.title}</h2>
      <p>{auction.description}</p>
      <p>Current Highest Bid: ${auction.highestBid || auction.startingBid}</p>
      <form onSubmit={handleBid}>
        <input
          type="number"
          placeholder="Place your bid"
          value={bid}
          onChange={(e) => setBid(e.target.value)}
        />
        <button type="submit">Place Bid</button>
      </form>
      <h3>Bid History</h3>
      <ul>
        {auction.bids && auction.bids.map((bid, index) => (
          <li key={index}>${bid.amount}</li>
        ))}
      </ul>
    </div>
  );
};

export default AuctionItem;
