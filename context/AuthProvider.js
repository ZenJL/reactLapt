import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const AuthProvider = (props) => {
  const initialToken = localStorage.getItem("token");

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(initialToken);

  const navigate = useNavigate();
  const location = useLocation();

  const isLoggedIn = !!token;

  const loginHandler = async (username = "", password = "") => {
    /// TO-DO: connect API & check username & password
    try {
      const response = await fetch("http://localhost:8080/api/user/login", {
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

      if (response.ok) {
        localStorage.setItem("token", data.token);
        setToken(data.token);

        const origin = location.state?.from?.pathname || "/shop";

        navigate(origin);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.log(`App.js: line 92 🐱‍🚀❄🐱‍🏍 error ===>`, error);
    }

    // if (username === "neko" && password === "123") {
    //   setIsLoggedIn(true);
    //   localStorage.setItem("isLoggedInStatus", "1");
    //   // console.log(location.state);
    //   const origin = location.state?.from?.pathname || "/shop";

    //   navigate(origin);
    // } else {
    //   setIsLoggedIn(false);
    // }
  };

  const logoutHandler = () => {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        storeIsLoggedIn: isLoggedIn,
        token,
        setToken: setToken,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
