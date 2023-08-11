import jwtDecode from "jwt-decode";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import AuthContext from "./AuthContext";

const validateAndGetTokenFromLocalStorage = () => {
  if (localStorage.getItem("token")) {
    const storedToken = localStorage.getItem("token");
    const decodedStoredToken = jwtDecode(storedToken);
    if (decodedStoredToken.exp * 1000 - new Date().getTime() < 0) {
      localStorage.removeItem("token");
      return null;
    }
    return storedToken;
  }
};

const AuthProvider = (props) => {
  const initialToken = validateAndGetTokenFromLocalStorage();
  let logoutTimer;

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

        let decodedToken = jwtDecode(data.token);
        console.log(
          "🚀 ~ file: AuthProvider.js:38 ~ loginHandler ~ decodedToken:",
          decodedToken
        );
        const remainingTimeBeforeTokenExpire =
          decodedToken.exp * 1000 - new Date().getTime();
        // console.log(
        //   `AuthProvider.js: line 43 🐱‍🚀❄🐱‍🏍 remainingTime ===>`,
        //   remainingTimeBeforeTokenExpire / 1000 / 60 / 60 / 24
        // );

        logoutTimer = setTimeout(logoutHandler, remainingTimeBeforeTokenExpire);

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

  const logoutHandler = useCallback(() => {
    localStorage.removeItem("token");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
    setToken(null);
    navigate("/");
  }, [logoutTimer, navigate]);

  useEffect(() => {
    if (initialToken) {
      let decodedTokenUef = jwtDecode(initialToken);
      const remainBeforeExp = decodedTokenUef.exp * 1000 - new Date().getTime();
      setTimeout(logoutHandler, remainBeforeExp);
    }
  }, [initialToken, logoutHandler]);

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
