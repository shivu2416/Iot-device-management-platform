import { Navigate, Outlet } from "react-router-dom";

const LogAuth = () => {
  const isChecked = JSON.parse(localStorage.getItem("authToken"));
  const user = { loggedIn: isChecked ? true : false };
  return user.loggedIn;
};

const ProtectedRoutes = () => {
  const isAuth = LogAuth();
  const userRedirect = {
    loggedIn: isAuth ? <Outlet /> : <Navigate to="/login" />,
  };
  return userRedirect.loggedIn;
};

export default ProtectedRoutes;