import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const AuctionDetail = styled.div`
  display: flex;
  gap: 20px;
  padding: 20px;

  img {
    width: 400px;
    border-radius: 8px;
  }

  .details {
    flex-grow: 1;

    h2 {
      font-size: 2rem;
    }

    p {
      font-size: 1.2rem;
      color: #555;
    }

    .bid-form {
      margin-top: 20px;
    }
  }
`;

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
        console.error('Error fetching auction', error);
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
      console.error('Error placing bid', error);
    }
  };

  return (
    <div className="container">
      <AuctionDetail>
        <img src={auction.imageUrl} alt={auction.title} />
        <div className="details">
          <h2>{auction.title}</h2>
          <p>{auction.description}</p>
          <p>Current Bid: ${auction.highestBid || auction.startingBid}</p>
          <form className="bid-form" onSubmit={handleBid}>
            <input
              type="number"
              placeholder="Enter your bid"
              value={bid}
              onChange={(e) => setBid(e.target.value)}
              required
            />
            <button type="submit">Place Bid</button>
          </form>
        </div>
      </AuctionDetail>
    </div>
  );
};

export default AuctionItem;
