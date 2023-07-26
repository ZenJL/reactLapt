import React from "react";
import ExpenseForm from "./ProductForm";

const NewProduct = (props) => {
  const saveExpenseDataHandler = (data) => {
    const newExpenseData = { ...data, id: Math.random() };
    props.getValueApp(newExpenseData);
  };

  return <ExpenseForm saveExpenseDataHandler={saveExpenseDataHandler} />;
};

export default NewProduct;
