import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const { isLogin } = useSelector((state) => state.login);
  if (isLogin) return <Outlet></Outlet>;
  if (!isLogin) return <Navigate to="/auth" replace></Navigate>;
};

export default ProtectedRoute;
