import React, { useEffect, useState } from 'react';
import axios from 'axios';

const apiUrl = process.env.REACT_APP_API_URL;

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const { data } = await axios.get(`${apiUrl}/api/bidsnotifications`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        setNotifications(data);
      } catch (error) {
        setError('Failed to fetch notifications.');
      }
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <ul>
        {notifications.map((notification) => (
          <li key={notification._id}>
            <p>{notification.message}</p>
            <p>
              <small>{new Date(notification.createdAt).toLocaleString()}</small>
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Notifications;
