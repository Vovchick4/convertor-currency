import { Header, Convertor } from "../shared/components";
import { CurrencyContextProvider } from "../shared/contexts/currency-data";
import styles from "./App.module.css";

function App() {
  return (
    <CurrencyContextProvider>
      <div className={styles.main_wrapper}>
        <Header />
        <Convertor />

        <div className={styles.footer}>Footer Vova</div>
      </div>
    </CurrencyContextProvider>
  );
}

export default App;
