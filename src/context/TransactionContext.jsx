import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext({
  transactions: [],
  setTransactions: () => {},
  total: 0,
  currency: "UAH",
  setCurrency: () => {},
  formattedTotal: "₴0.00",
  formatAmount: () => {},
});

// Фіксовані курси валют відносно гривні
const currencyRates = {
  UAH: 1,
  USD: 0.027,
  EUR: 0.025,
};

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);
  const [currency, setCurrency] = useState("UAH");

  // Завантаження транзакцій
  useEffect(() => {
    const stored = localStorage.getItem("transactions");
    if (stored) {
      try {
        setTransactions(JSON.parse(stored));
      } catch (e) {
        console.error("Parsing error:", e);
        localStorage.removeItem("transactions");
      }
    }
  }, []);

  // Збереження транзакцій
  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  // Загальна сума в гривнях
  const total = transactions.reduce((acc, next) => acc + next.amount, 0);

  // Конвертація валюти
  const convertedTotal = total * (currencyRates[currency] || 1);

  // Форматування суми
  const formattedTotal = new Intl.NumberFormat("uk-UA", {
    style: "currency",
    currency,
  }).format(convertedTotal);

  // Функція форматування для кожної суми
  const formatAmount = (amount) => {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency,
    }).format(amount * (currencyRates[currency] || 1));
  };

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        total,
        currency,
        setCurrency,
        formattedTotal,
        formatAmount,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
