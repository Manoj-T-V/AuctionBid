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

const AuctionCard = styled.div`
  background-color: #f9f9f9; 
  border-radius: 12px; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Updated shadow */
  padding: 16px; /* Adjusted padding */
  text-align: left; /* Changed text alignment */

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
    color: #666; /* Example text color */
    margin: 8px 0; /* Adjusted margin */
  }

  button {
    background-color: #007bff; /* Example button color */
    color: #fff;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    cursor: pointer;
    transition: background-color 0.3s;

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
