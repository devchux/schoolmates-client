import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const UserCard = ({ title, number, icon, variant }) => {
  return (
    <div className="user-card-wrapper">
      <div className="header">
        <h4>{title}</h4>
      </div>
      <div className="content">
        <h2>{number}</h2>
        <p>Total {title}</p>
      </div>
      <div className={`icon ${variant || ""}`}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
};

export default UserCard;
