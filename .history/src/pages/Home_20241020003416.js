import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';

const AuctionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const AuctionButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 11px 24px;
  width: 265px;
  height: 42px;
  background: linear-gradient(79.69deg, #DB2721 -0.64%, #5AD7FE 107.84%);
  border-radius: 4px;
  border: none;
  color: #FFFFFF;
  font-family: 'Manrope', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 20px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3; /* Example hover color */
  }

  svg {
    margin-left: 10px;
  }
`;

const apiUrl = process.env.REACT_APP_API_URL;
const Home = () => {
  const [auctions, setAuctions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/auctions`);
        setAuctions(data);
      } catch (error) {
        console.error('Error fetching auctions', error);
      }
    };
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    fetchAuctions();
  }, []);

  return (
    <div className="container">
      {isLoggedIn ? (
        <h1 className="page-title" style={{textAlign: 'left'}}>Welcome <span style={{ color: '#235BDB' }}>{localStorage.getItem('name')}</span></h1>
      ) : (
        <PlaceholderImage>
          <img src='https://picsum.photos/400' alt='Placeholder' />
        </PlaceholderImage>
      )}
      <AuctionList>
        {auctions.map((auction) => (
          <AuctionCard key={auction._id}>
            <img src='https://picsum.photos/200' alt={auction.title} />
            <h3>{auction.title}</h3>
            <p>Minimum Bid: ${auction.startingBid}</p>
            <p>Current Bid: ${auction.currentHighestBid}</p>
            <p>Ends in: {auction.endDate}</p>
            <Link to={`/auction/${auction._id}`}>
              <button>Bid Now</button>
            </Link>
          </AuctionCard>
        ))}
      </AuctionList>
    </div>
  );
};

export default Home;
