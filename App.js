// import logo from "./logo.svg";
import "./App.css";
import Product from "./components/Product/Product";
import NewProduct from "./components/NewProduct/NewProduct";
import { useEffect, useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import AuthContext from "./context/AuthContext";
import { DrawerHeader, Main } from "./components/UI/StyledMUI";
import { Route, Routes, useNavigate } from "react-router-dom";
import ProtectedRoute from "./guard/ProtectedRoute";

const initialProduct = [
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

  const [listExpense, setListExpense] = useState(initialProduct);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();

  const addExpenseHandler = (expense) => {
    setListExpense((prev) => [...prev, expense]);
  };

  // Login
  const loginHandler = ({ username = "", password = "" }) => {
    // To-do: connect API & check username & password
    // setIsLoggedIn(true);

    if (username === "neko" && password === "123") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedInStatus", "1");

      navigate("/product");
    } else {
      setIsLoggedIn(false);
    }
  };

  // Logout
  const logoutHandler = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("isLoggedInStatus");

    navigate("/");
  };

  const itemLocalStorage = localStorage.getItem("isLoggedInStatus");

  useEffect(() => {
    if (itemLocalStorage === "1") {
      setIsLoggedIn(true);
    }
  }, [itemLocalStorage]);

  return (
    <AuthContext.Provider
      value={{
        storeIsLoggedIn: isLoggedIn,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      <Navigation
        // logoutHandler={logoutHandler}
        onDrawerOpen={setIsDrawerOpen}
        isDrawerOpen={isDrawerOpen}
      />
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route
            path="product"
            element={
              <Main open={isDrawerOpen}>
                <DrawerHeader />
                <NewProduct getValueApp={addExpenseHandler} />
                <Product expense={listExpense}>
                  {/* <ExpenseItem
          title={listExpense[0].title}
          amount={listExpense[0].amount}
          date={listExpense[0].date}
          listExpense={listExpense}
        /> */}
                </Product>
              </Main>
            }
          />
        </Route>

        <Route index element={<Login />} />

        {/* {isLoggedIn && (
          <Main open={isDrawerOpen}>
            <DrawerHeader />
            <NewProduct getValueApp={addExpenseHandler} />
            <Product expense={listExpense}>
              <ExpenseItem
          title={listExpense[0].title}
          amount={listExpense[0].amount}
          date={listExpense[0].date}
          listExpense={listExpense}
        />
            </Product>
          </Main>
        )} */}

        {/* {!isLoggedIn && (
          <Login
          // loginHandler={loginHandler}
          />
        )} */}
      </Routes>
    </AuthContext.Provider>
  );
}

export default App;
