import { FormConvert } from "..";
import styles from "./Convertor.module.css";

export default function Convertor() {
  return (
    <div className={styles.convertor_content}>
      <p className={styles.convertor_content_text}>Convertor</p>

      <FormConvert />
    </div>
  );
}
