import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { selectAuthToken } from "../../redux/auth/slice";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const token = useAppSelector(selectAuthToken);

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default RequireAuth;
