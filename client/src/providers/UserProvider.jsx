import React, { useState, useContext, useEffect, useMemo } from "react";
import { getToken, removeStorage ,setTokenUser} from '../services/localStorageService';

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken);
  

  /*useEffect(() => {
    if (!user) {
      const userFromLocalStorage = getUser();
      setUser(userFromLocalStorage)
    }
  }, [user]);*/

  const logout = () => {
    removeStorage(); 
    setUser(null);   
    setToken(null);  
  };

  const login = (tokenValue, userData) => {
    setToken(tokenValue);  
    setUser(userData);     
    setTokenUser(tokenValue,userData); 
  };

  const value = useMemo(() => {
    return { user, setUser, token, setToken ,logout,login};
  }, [user, token]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
