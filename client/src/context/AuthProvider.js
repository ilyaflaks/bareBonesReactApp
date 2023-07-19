import { createContext, useState, useEffect } from "react";
import API from "../api/axios";
const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //  const [auth, setAuth] = useState({});
  const [auth, setAuth] = useState(false);

  const logout = async () => {
    const response = await API.get("/users/auth/signout", {
      withCredentials: true,
      credentials: "include",
    });
    console.log(response);
    setAuth(false);
  };

  useEffect(() => {
    const arr = document.cookie.split("; ");
    if (arr.indexOf("authenticated=true") >= 0) {
      setAuth(true);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
