import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const MyAuctions = () => {
  const [userAuctions, setUserAuctions] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAuctions = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/auctions/getmyauctions`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUserAuctions(data);
      } catch (error) {
        navigate('/login');
        setError('Failed to fetch auctions.');
      }
    };
    fetchUserAuctions();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/auctions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserAuctions(userAuctions.filter(auction => auction._id !== id));
    } catch (error) {
      setError('Failed to delete auction.');
    }
  };

  const handleEdit = (id) => {
    navigate(`/auctions/edit/${id}`);
  };

  return (
    <div>
      <h2>My Auctions</h2>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <ul>
        {userAuctions.map((auction) => (
          <li key={auction._id}>
            <h3>{auction.title}</h3>
            <p>{auction.description}</p>
            <button onClick={() => handleEdit(auction._id)}>Edit</button>
            <button onClick={() => handleDelete(auction._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyAuctions;
