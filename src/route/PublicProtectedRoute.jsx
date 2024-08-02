import { useState, useEffect } from "react";
import { useAuth } from "../services/provider/AuthContextProvider";
import { Navigate, Outlet } from "react-router";
import instance from "../services/api/axios";

const PublicProtectedRoute = () => {
  const [role, setRole] = useState(null);
  const token = localStorage.getItem("token");
  const { headers, authUser } = useAuth();

  useEffect(() => {
    if (token) {
      const fetchRole = async () => {
        try {
          const res = await instance.get("/verify", { headers });
          setRole(res.data.user.role);
        } catch (error) {
          console.error("Error fetching role:", error);
        }
      };
      fetchRole();
    }
  }, [token, headers]);

  // No token means the user is not authenticated, so render public routes
  if (!token) {
    return <Outlet />;
  }

  // If the role is still being fetched, you can render a loading state or return null
  if (role === null) {
    return (
      <div className="text-center min-h-screen my-10">
        <p>Loading...</p>
      </div>
    );
  }

  // Redirect based on role
  if (role === "admin") {
    return <Navigate to="/admin/dashboard" />;
  } else if (role === "cashier") {
    return <Navigate to="/cashier/home" />;
  }

  return <Outlet />;
};

export default PublicProtectedRoute;
