import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = user?.isAuthUser;
  const role = user?.role;
  const location = window.location.pathname;

  if (!isAuthenticated) {
    return <Navigate replace to="/" />;
  }
  if (location === "/delete-account") {
    return children;
  }
  if (role === "student" && !location.startsWith("/student")) {
    return <Navigate replace to="/student" />;
  }
  if (role === "teacher" && !location.startsWith("/teacher")) {
    return <Navigate replace to="/teacher" />;
  }

  return children;
};

export default ProtectedRoute;
