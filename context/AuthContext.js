import { createContext } from "react";

const AuthContext = createContext({
  storeIsLoggedIn: false,
  token: "",
  setToken: (token) => {},
  login: (username, password) => {},
  logout: () => {},
});

export default AuthContext;
