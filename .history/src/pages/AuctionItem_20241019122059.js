import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const apiUrl = process.env.REACT_APP_API_URL;

// Styled components
const AuctionDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
  padding: 20px;

  img {
    width: 100%;
    max-width: 400px;
    border-radius: 8px;
  }

  .column {
    padding: 10px;

    h2 {
      font-size: 1.8rem;
    }

    p {
      font-size: 1.2rem;
      color: #555;
    }
  }

  .image-section {
    grid-column: 1 / 2; /* Image and details span one column */
    display: flex;
    flex-direction: column;
    align-items: center;
    
    .image-details {
      margin-top: 15px;
      text-align: center;
    }
  }

  .description {
    grid-column: 2 / 3;
    flex-grow: 1;
  }

  .bid-history {
    grid-column: 3 / 4;
    font-size: 1rem;
    color: #333;

    h3 {
      font-size: 1.5rem;
    }

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
    text-align: center;
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

const AuctionItem = () => {
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bid, setBid] = useState("");
  const [bidHistory, setBidHistory] = useState([]);

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const { data: bidData } = await axios.get(`${apiUrl}/api/bids/${id}/allbids`);
        const { data: auctionData } = await axios.get(`${apiUrl}/api/auctions/${id}`);
        setAuction(auctionData);
        setBidHistory(bidData);
      } catch (error) {
        console.error('Error fetching auction', error);
      }
    };
    fetchAuction();
  }, [id]);

  const handleBid = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${apiUrl}/api/bids/${id}/bid`,
        { amount: bid },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
      setAuction((prevAuction) => ({
        ...prevAuction,
        currentHighestBid: bid,
      }));
      setBidHistory((prevBids) => [...prevBids, { amount: bid, biddfirster: 'You' }]);
    } catch (error) {
      console.error('Error placing bid', error);
    }
  };

  if (!auction) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <AuctionDetail>
        {/* First Column: Image and Details */}
        <div className="image-section">
          <img src='https://picsum.photos/200' alt={auction.title} />
          <div className="image-details">
            <h2>{auction.title}</h2>
            <p>Current Bid: ${auction.currentHighestBid || auction.startingBid}</p>
            <p>Ends at: {new Date(auction.endDate).toUTCString()}</p>
          </div>
        </div>

        {/* Second Column: Description */}
        <div className="column description">
          <p>{auction.description}</p>
        </div>

        {/* Third Column: Bid History */}
        <div className="column bid-history">
          <h3>Bid History</h3>
          <ul>
            {bidHistory.map((bid, index) => (
              <li key={index}>
                {bid.bidder?.firstName} {bid.bidder?.lastName} bids ${bid.amount}
              </li>
            ))}
          </ul>

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
