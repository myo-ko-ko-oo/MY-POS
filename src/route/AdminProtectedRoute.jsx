import { useState, useEffect } from "react";
import { useAuth } from "../services/provider/AuthContextProvider";
import { Navigate, Outlet } from "react-router";
import instance from "../services/api/axios";

const AdminProtectedRoute = () => {
  const [role, setRole] = useState(null);
  const { headers, setAuthUser, setAuth, token } = useAuth();

  //fetch role
  useEffect(() => {
    const fetchRole = async () => {
      if (token) {
        try {
          const res = await instance.get("/verify", { headers });
          setRole(res.data.user.role);
          setAuthUser(res.data.user);
          setAuth(res.data.auth);
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      }
    };

    fetchRole();
  }, []);

  if (role === null) {
    return (
      <div className="text-center min-h-screen my-10">
        <p>Loading...</p>
      </div>
    );
  }
  return role == "admin" ? <Outlet /> : <Navigate to={"/login"} />;
};

export default AdminProtectedRoute;
