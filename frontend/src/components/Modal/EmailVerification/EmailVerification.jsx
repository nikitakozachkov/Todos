import { resendVerificationUser } from "services/auth-api";
import styles from "./EmailVerification.module.css";

export const EmailVerification = ({ onClose }) => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    try {
      const credentials = {
        email: form.elements.email.value.trim(),
      };

      const data = await resendVerificationUser(credentials);
      alert(data.message);

      form.reset();

      onClose();
    } catch (error) {
      alert("Verification already passed or no such account")
    }
  };

  return (
    <form className={styles.form} onSubmit={handleFormSubmit}>
      <label>
        Email
        <input type="email" name="email" required />
      </label>

      <div className={styles.controls}>
        <button type="submit">Continue</button>

        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </form>
  );
};
