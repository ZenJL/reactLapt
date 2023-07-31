import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import NewProduct from "./components/NewProduct/NewProduct";
import Product from "./components/Product/Product";
import ItemList from "./components/Shop/ItemList";
import { DrawerHeader, Main } from "./components/UI/StyledMUI";
import AuthContext from "./context/AuthContext";
import CartContext from "./context/CartContext";
import ProtectedRoute from "./guard/ProtectedRoute";
import CartProvider from "./context/CartProvider";

const initialProduct = [
  {
    id: 1,
    title: "Superman: Action Comics",
    amount: 12.99,
    date: new Date(2023, 6, 17),
    imageUrl: "./BOOK-COMIC-1000.jpg",
    category: "C",
  },
  {
    id: 2,
    title: "Batman: The Silver Age Omnibus",
    amount: 99.99,
    date: new Date(2022, 6, 18),
    imageUrl: "./BOOK-COMIC-1001.jpg",
    category: "C",
  },
  {
    id: 3,
    title: "The Fifth Science",
    amount: 24.99,
    date: new Date(2022, 6, 19),
    imageUrl: "./BOOK-FICTION-1002.jpg",
    category: "F",
  },
  {
    id: 4,
    title: "The Summer House",
    amount: 15.0,
    date: new Date(2022, 6, 20),
    imageUrl: "./BOOK-ROMANTIC-1003.jpg",
    category: "R",
  },
  {
    id: 5,
    title: "The Art of Computer Programming",
    amount: 187.99,
    date: new Date(2023, 6, 20),
    imageUrl: "./BOOK-PROGRAMMING-1004.jpg",
    category: "P",
  },
];

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [listExpense, setListExpense] = useState(initialProduct);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const addProductHandler = (expense) => {
    setListExpense((prev) => [...prev, expense]);
  };

  // Login
  const loginHandler = ({ username = "", password = "" }) => {
    // To-do: connect API & check username & password
    // setIsLoggedIn(true);

    if (username === "neko" && password === "123") {
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedInStatus", "1");

      // navigate("/product");
      const origin = location.state?.from?.pathname || "/shop";

      navigate(origin);
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
      <CartProvider>
        <Navigation
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
                  <NewProduct getValueApp={addProductHandler} />
                  <Product expense={listExpense}></Product>
                </Main>
              }
            />
            <Route
              path="shop"
              element={
                <Main open={isDrawerOpen}>
                  <DrawerHeader />
                  <ItemList
                    isDrawerOpen={isDrawerOpen}
                    products={listExpense}
                  />
                </Main>
              }
            />
          </Route>

          <Route index element={<Login />} />
        </Routes>
      </CartProvider>
    </AuthContext.Provider>
  );
}

export default App;
