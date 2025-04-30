import { useContext, useState } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";

export const AddTransactionComponent = () => {
  const initialStateForm = { description: "", amount: "" };
  const [form, setForm] = useState(initialStateForm);
  const { transactions, setTransactions } = useContext(TransactionContext);

  const addTransaction = () => {
    const amountValue = parseFloat(form.amount);

    if (!form.description || isNaN(amountValue)) {
      return;
    }

    const newTransaction = {
      id: Date.now(),
      description: form.description,
      amount: amountValue,
    };

    setTransactions([...transactions, newTransaction]);
    setForm(initialStateForm);
  };
  return (
    <div className="flex items-center gap-2">
      <Input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <Input
        type="number"
        placeholder="Amount"
        className="w-1/3"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
      />
      <Button onClick={addTransaction}>
        <Plus />
      </Button>
    </div>
  );
};
