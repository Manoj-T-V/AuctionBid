import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

// Styled components
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

    .bid-history {
      margin-top: 20px;
      font-size: 1rem;
      color: #333;

      ul {
        list-style-type: none;
        padding: 0;
        li {
          margin: 5px 0;
          color: #777;
        }
      }
    }

    .bid-form {
      margin-top: 20px;
    }

    input {
      padding: 10px;
      margin-right: 10px;
      font-size: 1rem;
    }

    button {
      padding: 10px 20px;
      background-color: #007bff;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 1rem;
      border-radius: 5px;

      &:hover {
        background-color: #0056b3;
      }
    }
  }
`;

const apiUrl = 
const AuctionItem = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState({});
  const [bid, setBid] = useState("");
  const [bidHistory, setBidHistory] = useState([]);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const { data } = await axios.get(`/api/auctions/${id}`);
        setAuction(data);
        setBidHistory(data.bids); // Assuming bid history is part of the auction data
      } catch (error) {
        console.error('Error fetching auction', error);
      }
    };
    fetchAuction();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${apiUrl}/api/auctions/${id}/bid`, { bid });
      setAuction((prevAuction) => ({
        ...prevAuction,
        highestBid: response.data.highestBid,
      }));
      setBidHistory((prevBids) => [...prevBids, { amount: bid, bidder: 'You' }]);
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

          {/* Bid History */}
          <div className="bid-history">
            <h3>Bid History</h3>
            <ul>
              {bidHistory.map((bid, index) => (
                <li key={index}>
                  {bid.bidder} bids ${bid.amount}
                </li>
              ))}
            </ul>
          </div>

          {/* Bid Form */}
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
