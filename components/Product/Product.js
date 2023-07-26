import React, { useState } from "react";
import ExpenseItem from "./ProductItem";
import "./Product.css";
import Card from "../UI/Card";
import ExpenseFilter from "./ProductFilter";
import { Button } from "@mui/base";
import { Box } from "@mui/material";

const Product = (props) => {
  const { expense: dataList } = props;

  const [dataShow, setDataShow] = useState(props.expense);

  const selectedYearHandle = (value) => {
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
            Không có dữ liệu
          </h1>
        )
      }
    </Card>
  );
};

export default Product;
