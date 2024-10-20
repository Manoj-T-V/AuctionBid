import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { FaBell } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const apiUrl = process.env.REACT_APP_API_URL;
const na

// Styled Components for better UI
const NotificationContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const NotificationList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const NotificationItem = styled.li`
  display: flex;
  align-items: center;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 15px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-3px);
  }

  & svg {
    margin-right: 15px;
    color: #007bff;
  }

  & p {
    margin: 0;
    color: #333;
  }

  & small {
    display: block;
    color: #888;
    margin-top: 5px;
  }
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  margin-top: 20px;
`;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/bids/notifications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotifications(data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
            
        }
        console.log(error);
        setError('Failed to fetch notifications.');
      }
    };
    fetchNotifications();
  }, []);

  return (
    <NotificationContainer>
      <h2>
        <FaBell /> Notifications
      </h2>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <NotificationList>
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <NotificationItem key={notification._id}>
              <FaBell size={24} />
              <div>
                <p>{notification.message}</p>
                <small>{new Date(notification.createdAt).toLocaleString()}</small>
              </div>
            </NotificationItem>
          ))
        ) : (
          <p>No notifications to show.</p>
        )}
      </NotificationList>
    </NotificationContainer>
  );
};

export default Notifications;
