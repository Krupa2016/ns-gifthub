import React from "react";
import "./Card.css";

const Card = ({ image, title,  details }) => {
  return (
    <div className="card">
      <div>
        <img src={image} alt="card-img" className="card-img" />
      </div>
      <div className="card-content">
        <div className="card-header">
          <h1 className="card-title">{title}</h1>
        </div>
        <div className="card-details">
          <p>{details.id}</p>
          <p>{details.value}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
