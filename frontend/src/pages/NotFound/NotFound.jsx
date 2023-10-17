import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound () {
  return (
    <div className={styles.container}>
      <p className={styles.text}>This page doesn't exist :(</p>

      <Link to="/">Click here to go back</Link>
    </div>
  );
};

export default NotFound;