import { Routes, Route } from "react-router-dom";
import { lazy, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { refreshUser } from "redux/auth/actions";
import { getIsRefreshing } from "redux/auth/selectors";
import { PrivateRoute } from "./PrivateRoute";
import { RestricredRoute } from "./RestricredRoute";
import { Layout } from "./Layout/Layout";

const HomePage = lazy(() => import("pages/Home/Home"));
const SignupPage = lazy(() => import("pages/Signup/Signup"));
const LoginPage = lazy(() => import("pages/Login/Login"));
const NotFoundPage = lazy(() => import("pages/NotFound/NotFound"));

export const App = () => {
  const dispatch = useDispatch();
  const isRefreshing = useSelector(getIsRefreshing);

  useEffect(() => {
    dispatch(refreshUser());
  }, [dispatch]);

  return (
    !isRefreshing && (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route
            index
            element={<PrivateRoute component={HomePage} redirectTo="/login" />}
          />

          <Route
            path="/signup"
            element={
              <RestricredRoute component={SignupPage} redirectTo="/login" />
            }
          />

          <Route
            path="/login"
            element={<RestricredRoute component={LoginPage} redirectTo="/" />}
          />

          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    )
  );
};
