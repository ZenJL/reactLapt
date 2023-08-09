import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/Login/Login";
import Navigation from "./components/Navigation/Navigation";
import NewProduct from "./components/NewProduct/NewProduct";
import Product from "./components/Product/Product";
import ItemList from "./components/Shop/ItemList";
import { DrawerHeader, Main } from "./components/UI/StyledMUI";
import AuthProvider from "./context/AuthProvider";
import CartProvider from "./context/CartProvider";
import ProtectedRoute from "./guard/ProtectedRoute";

function App() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const addProductHandler = async (product) => {
    // setProducts((prevState) => {
    //   return [...prevState, product];
    // });

    const response = await fetch("http://localhost:8080/api/products/add", {
      method: "POST",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    fetchProductHandler();
  };

  // Fetch API
  // const fetchProductHandler = () => {
  //   fetch("http://localhost:8080/api/products")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const productFromAPI = data?.products;
  //       const transformedProduct = productFromAPI.map((item) => {
  //         return {
  //           ...item,
  //           date: new Date(item.date),
  //         };
  //       });
  //       setProducts(transformedProduct);
  //     });
  // };

  // Async await
  const fetchProductHandler = async () => {
    setIsLoading(true);
    setErrorMsg(null);
    try {
      const response = await fetch("http://localhost:8080/api/products");
      const data = await response.json();

      const transformedProduct = data?.products.map((item) => {
        return {
          ...item,
          date: new Date(item.date),
        };
      });
      setProducts(transformedProduct);
    } catch (error) {
      // console.log(`App.js: line 127 🐱‍🚀❄🐱‍🏍 error ===>`, error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Register user
  const addUserHandler = async (username, password) => {
    try {
      const response = await fetch("http://localhost:8080/api/user/register", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(`App.js: line 161 🐱‍🚀❄🐱‍🏍 data ===>`, data);
    } catch (error) {
      // console.log(`App.js: line 127 🐱‍🚀❄🐱‍🏍 error ===>`, error);
      setErrorMsg(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  // Uef
  useEffect(() => {
    fetchProductHandler();
  }, []);

  return (
    // <AuthContext.Provider
    //   value={{
    //     storeIsLoggedIn: isLoggedIn,
    //     login: loginHandler,
    //     logout: logoutHandler,
    //   }}
    // >
    <AuthProvider>
      <CartProvider>
        <Navigation
          onDrawerOpen={setIsDrawerOpen}
          isDrawerOpen={isDrawerOpen}
          onFetchProduct={fetchProductHandler}
        />
        <Routes>
          <Route element={<ProtectedRoute />}>
            <Route
              path="product"
              element={
                <Main open={isDrawerOpen}>
                  <DrawerHeader />
                  <NewProduct getValueApp={addProductHandler} />
                  <Product products={products}></Product>
                </Main>
              }
            />
            <Route
              path="shop"
              element={
                <Main open={isDrawerOpen}>
                  <DrawerHeader />
                  {!isLoading && errorMsg && (
                    <Typography>{errorMsg}</Typography>
                  )}
                  {isLoading && <Typography>Loading...</Typography>}

                  {!isLoading && products.length > 0 && (
                    <ItemList isDrawerOpen={isDrawerOpen} products={products} />
                  )}
                </Main>
              }
            />
          </Route>

          <Route index element={<Login onAddUser={addUserHandler} />} />
        </Routes>
      </CartProvider>
    </AuthProvider>
    // </AuthContext.Provider>
  );
}

export default App;
