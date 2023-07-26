import React from "react";
import "./Card.css";
import "../Product/ProductItem.css";

const Card = (props) => {
  return <div className={`card ${props.className}`}>{props.children}</div>;
};

export default Card;
