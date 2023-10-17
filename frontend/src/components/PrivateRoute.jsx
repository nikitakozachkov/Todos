import { useSelector } from "react-redux";
import { getIsLoggedIn, getIsRefreshing } from "redux/auth/selectors";
import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ component: Component, redirectTo = "/" }) => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isRefreshing = useSelector(getIsRefreshing);

  const shouldRedirect = !isRefreshing && !isLoggedIn;
  
  return shouldRedirect ? <Navigate to={redirectTo} /> : <Component />;
};