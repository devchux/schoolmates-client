import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

const HomeCard = ({ amount, title, icon, isBadge = false, ...rest }) => {
  return (
    <div {...rest} className={`home-card-wrapper ${isBadge ? "is-badge" : ""}`}>
      {isBadge ? (
        <>
          <FontAwesomeIcon icon={icon} />
          <p>{title}</p>
        </>
      ) : (
        <>
          <p>{title}</p>
          <h3>{amount}</h3>
        </>
      )}
    </div>
  );
};

export default HomeCard;
