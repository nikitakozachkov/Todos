import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { signupUser } from "redux/auth/actions";
import { getIsError } from "redux/auth/selectors";
import { Modal } from "components/Modal/Modal";
import { EmailVerification } from "components/Modal/EmailVerification/EmailVerification";
import styles from "./Signup.module.css";

function Signup() {
  const dispatch = useDispatch();

  const isError = useSelector(getIsError);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleClickModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (!isError) {
      try {
        const user = {
          username: form.elements.username.value.trim(),
          email: form.elements.email.value.trim(),
          password: form.elements.password.value.trim(),
        };

        toast.success("Please verify your email");
        dispatch(signupUser(user));
        form.reset();
      } catch {
        toast.error("Something went wrong, please try again later");
      }
    }

    toast.error("Email is already in use");
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
