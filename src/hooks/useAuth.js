import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const useAuth = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // Assuming token is stored in localStorage

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  return !!token;
};

export default useAuth;
