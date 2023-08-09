import { useState } from "react";
import Card from "../UI/Card";
import "./Product.css";
import ExpenseFilter from "./ProductFilter";
import ExpenseItem from "./ProductItem";

const Product = (props) => {
  const { products: dataList } = props;

  const [dataShow, setDataShow] = useState(props.products);

  const selectedYearHandle = (value) => {
    const newData = dataList?.filter(
      (item, idx) => item.date.getFullYear() === value
    );
    setDataShow(newData);
  };

  const resetData = () => {
    setDataShow(props.products);
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
