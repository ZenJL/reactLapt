import { createContext } from "react";

const AuthContext = createContext({
  storeIsLoggedIn: false,
  login: (username, password) => {},
  logout: () => {},
});

export default AuthContext;
