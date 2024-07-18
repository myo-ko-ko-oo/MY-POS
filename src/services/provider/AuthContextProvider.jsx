import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext();
export function useAuth() {
  return useContext(AuthContext);
}

export default function AuthProvider({ children }) {
  const [auth, setAuth] = useState(false);
  const [authUser, setAuthUser] = useState({});
  const [profile,setProfile]=useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  // Set the headers with the token
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "multipart/form-data",
  };

  const logout = () => {
    localStorage.clear();
    setAuth("");
    setAuthUser("");
    navigate("/");
  };
 
  const [inventoryMessage, setInventoryMessage] = useState("");
  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        authUser,
        setAuthUser,
        headers,
        token,
        logout,
        inventoryMessage,
        setInventoryMessage,
        profile,
        setProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
