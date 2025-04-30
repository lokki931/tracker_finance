import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext();

export function TransactionProvider({ children }) {
  const [transactions, setTransactions] = useState([]);

  // Load transactions from localStorage
  useEffect(() => {
    const storedTransactions = localStorage.getItem("transactions");
    if (storedTransactions) {
      try {
        setTransactions(JSON.parse(storedTransactions));
      } catch (error) {
        console.error("Error parsing localStorage data:", error);
        localStorage.removeItem("transactions");
      }
    }
  }, []);

  // Save transactions to localStorage
  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
    }
  }, [transactions]);

  const total = transactions.reduce((acc, next) => acc + next.amount, 0);

  return (
    <TransactionContext.Provider
      value={{
        transactions,
        setTransactions,
        total,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
}
