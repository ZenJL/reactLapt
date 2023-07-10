import React from "react";
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const saveExpenseDataHandler = (data) => {
    console.log(`NewExpense.js: line 6 🐱‍🚀❄🐱‍🏍 data ===>`, data);

    const newExpenseData = { ...data, id: Math.random() };
    props.getValueApp(newExpenseData);
  };

  return <ExpenseForm saveExpenseDataHandler={saveExpenseDataHandler} />;
};

export default NewExpense;
