import styles from "./FormColumn.module.css";

export default function FormColumn({ children }) {
  return <div className={styles.formColumnContent}>{children}</div>;
}
