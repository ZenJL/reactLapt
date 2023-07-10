import React, { Fragment, useState } from "react";
import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

const ExpenseItem = (props) => {
  const { listExpense } = props;

  const [title, setTitle] = useState(listExpense.title);

  const changeTitleFnc = () => {
    setTitle((prev) => prev + " 1");
    console.log(`ExpenseItem.js: line 9 🐱‍🚀❄🐱‍🏍  ===> title`, title);
  };

  return (
    <Fragment>
      <Card className="expense-item">
        {/* <div>{item.date.toDateString()}</div> */}

        <ExpenseDate data={listExpense.date}></ExpenseDate>
        <div className="expense-item__description">
          <h3>{title}</h3>
          <h2 className="expense-item__price">${listExpense.amount}</h2>
          {/* <button onClick={changeTitleFnc}>Change title</button> */}
        </div>
      </Card>
    </Fragment>
  );
};

export default ExpenseItem;
