import styles from "../styles/Home.module.css";

export default function Spinner() {
  return (
    <div className={styles.spinnerContainer}>
      <div className={styles.spinner} />
    </div>
  );
}
