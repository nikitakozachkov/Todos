import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "redux/auth/actions";
import { Link } from "react-router-dom";
import { Modal } from "components/Modal/Modal";
import { EmailVerification } from "components/Modal/EmailVerification/EmailVerification";
import styles from "./Signup.module.css";

function Signup() {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    try {
      const user = {
        username: form.elements.username.value.trim(),
        email: form.elements.email.value.trim(),
        password: form.elements.password.value.trim(),
      };

      dispatch(signupUser(user));
      form.reset();
    } catch {
      alert("Something went wrong, please try again later");
    }
  };

  return (
    <div className={styles.wrapper}>
      <h2 className={styles.header}>Sign up</h2>

      <form className={styles.form} onSubmit={handleFormSubmit}>
        <label>
          Username
          <input
            type="text"
            name="username"
            required
            className={styles.input}
          />
        </label>

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
            minLength={6}
            className={styles.input}
          />
        </label>

        <div className={styles.controls}>
          <button type="button" onClick={handleClickModal}>
            Resend email verification
          </button>

          <Link to="/login">Login</Link>
        </div>

        <button type="submit">Continue</button>
      </form>

      {isModalOpen && (
        <Modal isModalOpen={isModalOpen} onClose={handleClickModal}>
          <EmailVerification onClose={handleClickModal} />
        </Modal>
      )}
    </div>
  );
}

export default Signup;
