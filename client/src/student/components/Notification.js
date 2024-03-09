import React, { useState, useEffect } from 'react';

const NotificationReceiver = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://your-backend-notification-url');

    socket.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      setNotifications((prevNotifications) => [...prevNotifications, data.message]);
    });

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map((notification, index) => (
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationReceiver;
