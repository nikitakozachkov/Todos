import { InfinitySpin } from 'react-loader-spinner';
import styles from "./Loading.module.css";

export const Loading = () => (
  <div className={styles.backdrop}>
    <InfinitySpin color="#ffffff" />
  </div>
)