import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const apiUrl = process.env.REACT_APP_API_URL;

const MyAuctions = () => {
  const [userAuctions, setUserAuctions] = useState([]);
  const [error, setError] = useState("");
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
        navigate("/login");
        setError("Failed to fetch auctions.");
      }
    };
    fetchUserAuctions();
  }, [navigate]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiUrl}/api/auctions/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setUserAuctions(userAuctions.filter((auction) => auction._id !== id));
    } catch (error) {
      setError("Failed to delete auction.");
    }
  };

  const handleEdit = (id) => {
    navigate(`/auctions/edit/${id}`);
  };

  return (
    <div className="my-auctions-container">
      <div className="header">
        <h2>My Auctions</h2>
        <Link to="/create" className="add-auction-link">+ Add Auction</Link>
      </div>

      {error && <div className="error-message">{error}</div>}

      <ul className="auction-list">
        {userAuctions.map((auction) => (
          <li key={auction._id} className="auction-item">
            <div className="auction-details">
              <h3>{auction.title}</h3>
              <p>{auction.description}</p>
            </div>
            <div className="auction-actions">
              <button onClick={() => handleEdit(auction._id)} className="edit-button">
                Edit
              </button>
              <button onClick={() => handleDelete(auction._id)} className="delete-button">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {/* Styles */}
      <style>{`
        .my-auctions-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          background-color: #f9f9f9;
          border-radius: 10px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        h2 {
          margin: 0;
        }
        .add-auction-link {
          background-color: #28a745;
          color: white;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 4px;
          font-weight: bold;
        }
        .add-auction-link:hover {
          background-color: #218838;
        }
        .error-message {
          color: red;
          margin-bottom: 15px;
        }
        .auction-list {
          list-style-type: none;
          padding: 0;
        }
        .auction-item {
          background-color: #fff;
          padding: 15px;
          border-radius: 8px;
          margin-bottom: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          box-shadow: 0 1px 5px rgba(0, 0, 0, 0.1);
        }
        .auction-details {
          flex: 1;
        }
        h3 {
          margin: 0;
          font-size: 20px;
        }
        p {
          margin: 10px 0 0;
        }
        .auction-actions {
          display: flex;
          gap: 10px;
        }
        .edit-button, .delete-button {
          padding: 8px 15px;
          border: none;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
        }
        .edit-button {
          background-color: #007bff;
          color: white;
        }
        .edit-button:hover {
          background-color: #0056b3;
        }
        .delete-button {
          background-color: #dc3545;
          color: white;
        }
        .delete-button:hover {
          background-color: #c82333;
        }
      `}</style>
    </div>
  );
};

export default MyAuctions;
