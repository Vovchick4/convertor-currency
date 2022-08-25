import { useEffect, useState, useContext } from "react";
import { FormColumn, FormRow, Select } from "../";
import { convertCurrency } from "./utils";
import { getRateCurrencies } from "../../api/currency";
import { CurrencyContext } from "../../contexts/currency-data";
import styles from "./FormConvert.module.css";

export default function FormConvert() {
  const [inputValues, setInputValues] = useState({
    leftValue: "",
    rightValue: "",
  });

  const { currencies, setCurrencies } = useContext(CurrencyContext);
  const [loading, setLoading] = useState(false);
  const [leftSelectValue, setLeftSelectValue] = useState({ cc: "UAH" });
  const [rightSelectValue, setRightSelectValue] = useState({ cc: "USD" });

  useEffect(() => {
    setLoading(true);

    getRateCurrencies()
      .then((res) => {
        setRightSelectValue(res.data.find(({ cc }) => cc === "USD"));
        setLeftSelectValue(res.data.find(({ cc }) => cc === "EUR"));
        setCurrencies(res.data);
      })
      .catch((err) => alert(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    setInputValues((prev) => ({
      ...prev,
      rightValue: convertCurrency(
        inputValues.leftValue,
        leftSelectValue,
        rightSelectValue
      ),
    }));
  }, [leftSelectValue, rightSelectValue]);

  function onChangeValue(e) {
    if (e.target.name == "leftValue") {
      setInputValues((prev) => ({ ...prev, leftValue: e.target.value }));
      setInputValues((prev) => ({
        ...prev,
        rightValue: convertCurrency(
          e.target.value,
          leftSelectValue,
          rightSelectValue
        ),
      }));
    } else {
      setInputValues((prev) => ({ ...prev, rightValue: e.target.value }));
      setInputValues((prev) => ({
        ...prev,
        leftValue: convertCurrency(
          e.target.value,
          rightSelectValue,
          leftSelectValue
        ),
      }));
    }
  }

  function onChangeSelectLeftValue(value) {
    setLeftSelectValue(value);
  }

  function onChangeSelectRightValue(value) {
    setRightSelectValue(value);
  }

  if (loading) {
    return <p>Loading currencies...</p>;
  }

  return (
    <form>
      <FormRow>
        <FormColumn>
          <Select
            options={currencies}
            value={leftSelectValue}
            onChangeSelectItem={onChangeSelectLeftValue}
          />

          <input
            name="leftValue"
            value={inputValues.leftValue}
            onChange={onChangeValue}
            className={styles.input}
            type="number"
            placeholder="Your Value"
          />
        </FormColumn>

        <FormColumn>
          <Select
            options={currencies}
            value={rightSelectValue}
            onChangeSelectItem={onChangeSelectRightValue}
          />
          <input
            name="rightValue"
            value={inputValues.rightValue}
            onChange={onChangeValue}
            className={styles.input}
            type="number"
            placeholder="Your Value"
          />
        </FormColumn>
      </FormRow>
    </form>
  );
}
