import { TransactionContext } from "@/context/TransactionContext";
import { useContext } from "react";

export const HeaderTotalComponent = () => {
  const { total } = useContext(TransactionContext);
  return <p className="text-gray-600">Total Balance: ${total.toFixed(2)}</p>;
};
