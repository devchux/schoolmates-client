import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";

const HomeCard = ({
  amount,
  title,
  icon,
  isLink = false,
  isBadge = false,
  variant,
  ...rest
}) => {
  if (isLink) return (
    <Link {...rest} className={`home-card-wrapper ${isBadge ? "is-badge" : ""}`}>
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
    </Link>
  )
  return (
    <div {...rest} className={`home-card-wrapper ${variant || ''} ${isBadge ? "is-badge" : ""}`}>
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
