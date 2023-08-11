import { Fragment } from "react";
import "./ProductDate.css";

const ProductDate = (props) => {
  const { data } = props;
  const month = data.toLocaleString("en-US", { month: "long" });
  const day = data.getDate();
  const year = data.getFullYear();

  return (
    <Fragment>
      <div className="product-date">
        <div className="product-date__month">{month}</div>
        <div className="product-date__year">{day}</div>
        <div className="product-date__day">{year}</div>
      </div>
    </Fragment>
  );
};

export default ProductDate;
