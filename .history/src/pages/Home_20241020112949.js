import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import useErrorHandler from '../components/ErrorHandler.js';

const AuctionList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 20px;
  padding: 20px;
`;

const AuctionCard = styled.div`
  background-color: #f9f9f9; 
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  padding: 16px; 
  text-align: left; 

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 12px; /* Adjusted margin */
  }

  h3 {
    color: #222; /* Example text color */
    font-size: 1.25rem; /* Adjusted font size */
    margin-bottom: 8px; /* Added margin */
  }

  p {
    color: #000; /* Example text color */
    display:  flex;
    justify-content: space-between; 
  }

  .values{
  font-weight: bold;
  color: #000;
  margin-left: auto;
  }

  button {
    background: linear-gradient(79.69deg, #DB2721 -0.64%, #5AD7FE 107.84%);
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;
    width:100%;

    &:hover {
      background-color: #0056b3; /* Example hover color */
    }
  }
`;


const PlaceholderImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 300px; // Adjust height as needed
  background-color: #f0f0f0;
  border-radius: 10px;
  img {
    max-width: 100%;
    max-height: 100%;
    border-radius: 8px;
  }
`;

const apiUrl = process.env.REACT_APP_API_URL;
const Home = () => {
  useErrorHandler();
  const [auctions, setAuctions] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  
  const calculateRemainingTime = (endDate) => {
    const endDateMilliseconds = new Date(endDate).getTime();
    const nowMilliseconds = Date.now();
    const timeDifferenceMilliseconds = endDateMilliseconds - nowMilliseconds;
  
    if (timeDifferenceMilliseconds <= 0) {
      return 'Auction ended';
    }
  
    const days = Math.floor(timeDifferenceMilliseconds / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeDifferenceMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeDifferenceMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
  
    return `${days} days, ${hours} hours, ${minutes} minutes`;
  };

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
        <h1 className="page-title" style={{textAlign: 'left', margin:'2% 0% 1% 2%'}}>Welcome <span style={{ color: '#235BDB' }}>{localStorage.getItem('name')}</span></h1>
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
            <p>Minimum Bid <span className='values'>${auction.startingBid}</span></p>
            <p>Current Bid <span className='values'>${auction.currentHighestBid}</span></p>
            <p>Ends at: {new Date(auction.endDate).toLocaleDateString()}</p>
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
