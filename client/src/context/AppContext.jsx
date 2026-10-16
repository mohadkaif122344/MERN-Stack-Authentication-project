import axios from "axios";
import { useEffect, useState, createContext } from "react";
import { toast } from "react-toastify";

export const AppContext = createContext();

axios.defaults.withCredentials = true;

export const AppContextProvider = ({ children }) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const [userData, setUserData] = useState(null);
  const [isLoggedin, setIsLoggedin] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  const getAuthState = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/is-auth`);
      if (data.success) {
        setIsLoggedin(true);
        getUserData();
      } else {
        setIsLoggedin(false);
      }
    } catch {
      setIsLoggedin(false);
    } finally {
      setAuthChecked(true);
    }
  };

  const getUserData = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/data`);
      if (data.success) {
        setUserData(data.userData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  useEffect(() => {
    if (backendUrl) getAuthState();
  }, [backendUrl]);

  return (
    <AppContext.Provider
      value={{
        backendUrl,
        isLoggedin,
        setIsLoggedin,
        authChecked,
        userData,
        setUserData,
        getUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
