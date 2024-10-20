import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useErrorHandler from '../components/ErrorHandler.js';
import { Link } from 'react-router-dom';
import lefticon from '../assets/Right icon.svg';

const apiUrl = process.env.REACT_APP_API_URL;

// Styled components
const AuctionDetail = styled.div`
  display: grid;
  grid-template-columns: 1fr 1.3fr 1.3fr;
  gap: 4%;
  padding: 2%;

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

  .keys {
    display: flex;
    justify-content: space-between;
  }

  .values {
    font-weight: bold;
    color: #000;
    margin-left: auto;
  }

  .image-section {
    grid-column: 1 / 2;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .image-details {
      margin-top: 15px;
      text-align: center;
      width: 100%;
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
  useErrorHandler();
  const { id } = useParams();
  const [auction, setAuction] = useState(null);
  const [bid, setBid] = useState('');
  const [bidHistory, setBidHistory] = useState([]);
  const [remainingTime, setRemainingTime] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAuction = async () => {
      try {
        const { data: bidData } = await axios.get(`${apiUrl}/api/bids/${id}/allbids`);
        const { data: auctionData } = await axios.get(`${apiUrl}/api/auctions/${id}`);
        setAuction(auctionData);
        setBidHistory(bidData);
        calculateRemainingTime(auctionData.endDate);
      } catch (error) {
        console.error('Error fetching auction', error);
      }
    };

    fetchAuction();
  }, [id]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (auction) {
        calculateRemainingTime(auction.endDate);
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [auction]);

  const calculateRemainingTime = (endDate) => {
    const end = new Date(endDate).getTime();
    const now = Date.now();
    const timeLeft = end - now;

    if (timeLeft <= 0) {
      setRemainingTime('Auction ended');
      return;
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));

    setRemainingTime(`Ends in ${days}d ${hours}h ${minutes}m`);
  };

  const handleBid = async (e) => {
    e.preventDefault();
    setError('');
    const bidAmount = Number(bid);
    const currentBid = Number(auction.currentHighestBid);

    if (bidAmount <= currentBid) {
      setError('Bid must be higher than the current highest bid.');
      return;
    }
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
      setBidHistory((prevBids) => [
        ...prevBids,
        { amount: bid, bidder: { firstName: 'You', lastName: '' } },
      ]);
    } catch (error) {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        localStorage.removeItem('email');
        window.location.href = '/login';
      }
      console.error('Error placing bid', error);
    }
  };

  if (!auction) {
    return <div>Loading...</div>;
  }

  const auctionEnded = remainingTime === 'Auction ended';

  return (
    <div className="container">
      <AuctionDetail>
        <div className="image-section">
          <Link className="back-link" style={{ marginBottom: '4%' }} to="/">
            <img src={left
