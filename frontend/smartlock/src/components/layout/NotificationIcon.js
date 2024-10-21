import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import { IoMdNotificationsOutline } from "react-icons/io";
import "./NotificationIcon.css";

const socket = io("http://localhost:3333");

const NotificationIcon = () => {
  const [hasNotification, setHasNotification] = useState(true); // Para testes mudar para false futuramente
  const [notifications, setNotifications] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    socket.on("notification", (data) => {
      setNotifications((prevNotifications) => [data, ...prevNotifications]);
      setHasNotification(true);
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setHasNotification(false); // Marca como lido ao abrir o dropdown
  };

  return (
    <div className="notification-container">
      <IoMdNotificationsOutline
        className="icon-default"
        onClick={toggleDropdown}
      />
      {hasNotification && <span className="notification-dot"></span>}
      {dropdownOpen && (
        <div className="notification-dropdown">
          {notifications.length > 0 ? (
            notifications.map((notification, index) => (
              <div key={index} className="notification-item">
                <p>{notification.message}</p>{" "}
                {/* Mudar essa linha dependendo do que quer que apareça */}
              </div>
            ))
          ) : (
            <p>
              No notifications
              {/* Quando não tiver nenhuma notificação nova vai aparecer isso */}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationIcon;
