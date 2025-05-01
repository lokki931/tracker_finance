import { TransactionContext } from "@/context/TransactionContext";
import { useContext } from "react";

export const HeaderTotalComponent = () => {
  const { formattedTotal } = useContext(TransactionContext);
  return <p className="text-gray-600">Total Balance: {formattedTotal}</p>;
};
