import React, { useState } from "react";
import ExpenseItem from "./ExpenseItem";
import "./Expense.css";
import Card from "../UI/Card";
import ExpenseFilter from "./ExpenseFilter";
import { Button } from "@mui/base";
import { Box } from "@mui/material";

const Expense = (props) => {
  const { expense: dataList } = props;

  const [dataShow, setDataShow] = useState(props.expense);

  const selectedYearHandle = (value) => {
    console.log(`Expense.js: line 9 🐱‍🚀❄🐱‍🏍 item expense ===>`, value);
    console.log(`Expense.js: line 11 🐱‍🚀❄🐱‍🏍 dataList ===>`, dataList);

    const newData = dataList?.filter(
      (item, idx) => item.date.getFullYear() === value
    );
    setDataShow(newData);
  };

  const resetData = () => {
    setDataShow(props.expense);
  };

  return (
    <Card className="expenses">
      <ExpenseFilter
        selectedYearHandle={selectedYearHandle}
        resetData={resetData}
      />
      {
        //props.expense
        dataShow.length > 0 ? (
          dataShow.map((item, idx) => (
            <ExpenseItem key={item.id} listExpense={item} />
          ))
        ) : (
          <h1
            style={{
              color: "white",
              textAlign: "center",
            }}
          >
            Khong co du lieu
          </h1>
        )
      }
    </Card>
  );
};

export default Expense;
