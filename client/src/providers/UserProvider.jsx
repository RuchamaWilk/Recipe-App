import React, { useState, useContext, useEffect, useMemo } from "react";
import { getToken, getUser } from '../services/localStorageService';
import { getUserById } from '../services/apiService';

const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(getToken);
  const [chefCache, setChefCache] = useState({});

  useEffect(() => {
    if (!user) {
      const userFromLocalStorage = getUser();
      setUser(userFromLocalStorage);
    }
  }, [user]);

  const fetchChefName = async (chefId) => {
    if (chefCache[chefId]) {
      return chefCache[chefId];
    }
    try {
      const response = await getUserById(chefId);
      const chefName = response.result || 'Unknown Chef';
      setChefCache((prevCache) => ({
        ...prevCache,
        [chefId]: chefName,
      }));
      return chefName;
    } catch (error) {
      console.error('Failed to fetch chef name:', error);
      return 'Unknown Chef';
    }
  };

  const value = useMemo(() => {
    return { user, setUser, token, setToken, fetchChefName };
  }, [user, token, chefCache]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
