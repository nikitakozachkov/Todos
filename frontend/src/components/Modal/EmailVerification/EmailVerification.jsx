import toast from "react-hot-toast";
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

      await resendVerificationUser(credentials);

      form.reset();

      toast.success("Email verification was sent");
      onClose();
    } catch {
      toast.error("Verification already passed or no such account");
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
