import React, { Fragment } from "react";
import "./ExpenseDate.css";

const ExpenseDate = (props) => {
  console.log("🚀 ~ file: ExpenseDate.js:5 ~ ExpenseDate ~ props:", props);
  const { data } = props;
  const month = data.toLocaleString("en-US", { month: "long" });
  const day = data.getDate();
  const year = data.getFullYear();

  return (
    <Fragment>
      <div className="expense-date">
        <div className="expense-date__month">{month}</div>
        <div className="expense-date__year">{day}</div>
        <div className="expense-date__day">{year}</div>
      </div>
    </Fragment>
  );
};

export default ExpenseDate;
