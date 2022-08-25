import { useEffect, useState, useContext } from "react";
import { getRateCurrencies } from "../../api/currency";
import { CurrencyContext } from "../../contexts/currency-data";
import styles from "./Header.module.css";

export default function Header() {
  const { currencies, setCurrencies } = useContext(CurrencyContext);
  const [total, setTotal] = useState(4);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    getRateCurrencies()
      .then((res) => setCurrencies(res.data))
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, []);

  function incrementTotalCurrency() {
    setTotal((prev) => prev + 4);
  }

  if (loading) {
    return <p>Loading currencies...</p>;
  }

  return (
    <div className={styles.header}>
      <h2>Date Rate Currencies:</h2>

      <button onClick={incrementTotalCurrency}>Загрузити ще...</button>
      <table className={styles.content_currencies}>
        <tbody>
          <tr className={styles.currencies_txt}>
            <th>Name</th>
            <th>Rate</th>
            <th>Currency Symbol</th>
          </tr>

          {currencies.length > 0 &&
            currencies.slice(0, total).map(({ rate, txt, r030, cc }) => (
              <tr className={styles.currencies_txt} key={r030}>
                <td>
                  <span>{txt}</span>
                </td>
                <td>
                  <span>{rate}</span>
                </td>
                <td>
                  <span>{cc}</span>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
