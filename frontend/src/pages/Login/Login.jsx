import { useDispatch } from "react-redux";
import { loginUser } from "redux/auth/actions";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";

function Login() {
  const dispatch = useDispatch();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    try {
      const user = {
        email: form.elements.email.value.trim(),
        password: form.elements.password.value.trim(),
      };

      dispatch(loginUser(user));
      form.reset();
    } catch {
      alert("Something went wrong, please try again later");
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
