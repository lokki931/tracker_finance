import { useContext, useState } from "react";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTitle,
  AlertDialogDescription,
} from "./ui/alert-dialog";
import { Trash } from "lucide-react";
import { TransactionContext } from "@/context/TransactionContext";

export const ConfirmPopupComponent = ({ id }) => {
  const [deleteId, setDeleteId] = useState(null);
  const { transactions, setTransactions } = useContext(TransactionContext);
  const removeTransaction = () => {
    if (deleteId !== null) {
      const updatedTransactions = transactions.filter((t) => t.id !== deleteId);
      setTransactions(updatedTransactions);
      localStorage.setItem("transactions", JSON.stringify(updatedTransactions));
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Trash
          className="text-red-600 hover:text-red-400 cursor-pointer"
          size={15}
          onClick={() => setDeleteId(id)}
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete Transaction?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete this transaction? This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={removeTransaction}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
