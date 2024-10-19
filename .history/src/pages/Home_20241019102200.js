import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const AuctionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const AuctionCard = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  h3 {
    color: #333;
    font-size: 1.5rem;
  }

  p {
    color: #555;
    margin: 10px 0;
  }

  button {
    margin-top: 10px;
  }
`;

const apiUrl = process.env.REACT_APP_API_URL;
const Home = () => {
  const [auctions, setAuctions] = useState([]);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const { data } = await axios.get(``);
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions', error);
      }
    };
    fetchAuctions();
  }, []);

  return (
    <div className="container">
      <h1 className="page-title">Available Auctions</h1>
      <AuctionList>
        {auctions.map((auction) => (
          <AuctionCard key={auction._id}>
            <img src={auction.imageUrl} alt={auction.title} />
            <h3>{auction.title}</h3>
            <p>Starting Bid: ${auction.startingBid}</p>
            <Link to={`/auction/${auction._id}`}>
              <button>View Auction</button>
            </Link>
          </AuctionCard>
        ))}
      </AuctionList>
    </div>
  );
};

export default Home;
