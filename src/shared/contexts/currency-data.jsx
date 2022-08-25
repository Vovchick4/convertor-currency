import { createContext, useState } from "react";

export const CurrencyContext = createContext(null);

export function CurrencyContextProvider({ children }) {
  const [currencies, setCurrencies] = useState([]);

  const value = {
    currencies,
    setCurrencies,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}
