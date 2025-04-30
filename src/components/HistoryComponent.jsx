import { useContext, useEffect, useId, useMemo, useState } from "react";
import { TransactionContext } from "@/context/TransactionContext";
import { Button } from "./ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { ConfirmPopupComponent } from "./ConfirmPopupComponent";

export const HistoryComponent = () => {
  const filterBtnsObj = [
    {
      id: useId(),
      name: "All",
      value: "all",
    },
    {
      id: useId(),
      name: "Income",
      value: "income",
    },
    {
      id: useId(),
      name: "Expenses",
      value: "expenses",
    },
  ];

  const { transactions, total } = useContext(TransactionContext);

  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 5;

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      if (filter === "income") return transaction.amount > 0;
      if (filter === "expenses") return transaction.amount < 0;
      return true;
    });
  }, [transactions, filter]);

  const currentTransactions = useMemo(() => {
    return filteredTransactions.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    );
  }, [filteredTransactions, currentPage, itemsPerPage]);
  const totalPages = Math.max(
    1,
    Math.ceil(filteredTransactions.length / itemsPerPage)
  );
  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [totalPages, currentPage]);

  return (
    <>
      <div className="flex gap-2 my-2">
        {filterBtnsObj.map((btn) => (
          <Button
            key={btn.id}
            variant={filter === btn.value ? "default" : "outline"}
            onClick={() => setFilter(btn.value)}
          >
            {btn.name}
          </Button>
        ))}
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[40px]"></TableHead>
            <TableHead>Description</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {currentTransactions.length > 0 ? (
            currentTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell className="w-[40px] text-center">
                  <ConfirmPopupComponent id={transaction.id} />
                </TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell className="text-right">
                  {transaction.amount.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3} className="text-center text-gray-400">
                No transactions...
              </TableCell>
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell className="text-right">${total.toFixed(2)}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-between items-center mt-4">
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </Button>
          <span className="text-sm text-gray-600">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </>
  );
};
