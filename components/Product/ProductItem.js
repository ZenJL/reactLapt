import React, { Fragment, useState } from "react";
import "./ProductItem.css";
import ProductDate from "./ProductDate";
import Card from "../UI/Card";

const ProductItem = (props) => {
  const { listExpense } = props;

  const [title, setTitle] = useState(listExpense.title);

  const changeTitleFnc = () => {
    setTitle((prev) => prev + " 1");
  };

  return (
    <Fragment>
      <Card className="expense-item">
        {/* <div>{item.date.toDateString()}</div> */}

        <ProductDate data={listExpense.date}></ProductDate>
        <div className="expense-item__description">
          <h3>{title}</h3>
          <h2 className="expense-item__price">${listExpense.amount}</h2>
          {/* <button onClick={changeTitleFnc}>Change title</button> */}
        </div>
      </Card>
    </Fragment>
  );
};

export default ProductItem;
