import logo from "./logo.svg";
import "./App.css";
import Expense from "./components/Expense/Expense";
import NewExpense from "./components/NewExpense/NewExpense";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";

const initialExpenses = [
  { id: 1, title: "Petrol Gas", amount: 2, date: new Date(2023, 7, 3) },
  { id: 2, title: "Movie", amount: 10, date: new Date(2023, 10, 3) },
  { id: 3, title: "Lunch", amount: 5, date: new Date(2023, 12, 3) },
];

function App() {
  // let listExpense = [
  //   { id: 1, title: "Petrol Gas", amount: 2, date: new Date(2023, 7, 3) },
  //   { id: 2, title: "Movie", amount: 10, date: new Date(2023, 10, 3) },
  //   { id: 3, title: "Lunch", amount: 5, date: new Date(2023, 12, 3) },
  // ];
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [listExpense, setListExpense] = useState(initialExpenses);

  const addExpenseHandler = (expense) => {
    setListExpense((prev) => [...prev, expense]);
  };

  // Login
  const loginHandler = ({ username = "", password = "" }) => {
    // To-do: connect API & check username & password
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedInStatus", "1");
  };

  // Logout
  const logoutHandler = () => {
    setIsLoggedIn(false);
  };

  const itemLocalStorage = localStorage.getItem("isLoggedInStatus");

  useEffect(() => {
    if (itemLocalStorage === "1") {
      setIsLoggedIn(true);
    }
  }, [itemLocalStorage]);

  return isLoggedIn ? (
    <Navigation logoutHandler={logoutHandler}>
      <NewExpense getValueApp={addExpenseHandler} />
      <Expense expense={listExpense}>
        {/* <ExpenseItem
          title={listExpense[0].title}
          amount={listExpense[0].amount}
          date={listExpense[0].date}
          listExpense={listExpense}
        /> */}
      </Expense>
    </Navigation>
  ) : (
    <Login loginHandler={loginHandler} />
  );
}

export default App;
