import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Navigate } from "react-router-dom";

interface RejectedRouteProps {
  children: React.ReactNode;
}

const RejectedRoute = ({ children }: RejectedRouteProps) => {
  const user = useSelector((state: RootState) => state.user);
  const isAuthenticated = user?.isAuthUser;
  const role = user?.role;

  if (isAuthenticated) {
    return <Navigate replace to={`/${role}`} />;
  }

  return children;
};

export default RejectedRoute;
