import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser, getIsLoggedIn } from "redux/auth/selectors";
import { logoutUser } from "redux/auth/actions";
import styles from "./Nav.module.css";

export const Nav = () => {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const handleClick = async () => {
    try {
      dispatch(logoutUser());
    } catch {
      alert("Something went wrong, please try again later");
    }
  };

  return (
    <nav className={styles.container}>
      <Link to="/">
        <p className={styles.logo}>TODO<span>S.</span></p>
      </Link>

      {isLoggedIn && (
        <div className={styles.auth}>
          <p>{user.username} | </p>

          <button type="button" onClick={handleClick}>
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};
