import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "redux/auth/actions";
import { getIsError } from "redux/auth/selectors";
import styles from "./Login.module.css";

function Login() {
  const dispatch = useDispatch();

  const isError = useSelector(getIsError);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!isError) {
      try {
        const user = {
          email: form.elements.email.value.trim(),
          password: form.elements.password.value.trim(),
        };

        toast.success("Successfully logged in");
        dispatch(loginUser(user));
        form.reset();
      } catch {
        toast.error("Something went wrong, please try again later");
      }
    } else {
      toast.error("Incorrect email or password");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Login</h2>

      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label>
          Email
          <input type="email" name="email" required className={styles.input} />
        </label>

        <label>
          Password
          <input
            type="password"
            name="password"
            required
            className={styles.input}
          />
        </label>

        <Link to="/signup">Sign up</Link>

        <button type="submit">Continue</button>
      </form>
    </div>
  );
}

export default Login;
