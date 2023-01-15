import React from "react";

const HomeCard = ({ amount, title }) => {
  return (
    <div className="home-card-wrapper">
      <p>{title}</p>
      <h3>{amount}</h3>
    </div>
  );
};

export default HomeCard;
