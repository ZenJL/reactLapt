import React from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expense.css";
import Card from "../UI/Card";

const Expense = (props) => {
  return (
    <Card className="expenses">
      {props.expense.map((item, idx) => (
        <ExpenseItem key={item.id} listExpense={item} />
      ))}
    </Card>
  );
};

export default Expense;
