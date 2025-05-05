import { TransactionContext } from "@/context/TransactionContext";
import { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00C49F", "#FF6384"]; // Green for Income, Red for Expenses

const PieChartComponent = () => {
  const { transactions, formatAmount } = useContext(TransactionContext);
  if (!transactions.length)
    return <p className="text-center text-gray-400">No data to display...</p>;

  // Summing income and expenses
  const { income, expenses } = transactions.reduce(
    (acc, t) => {
      if (t.amount > 0) {
        acc.income += t.amount;
      } else {
        acc.expenses += Math.abs(t.amount);
      }
      return acc;
    },
    { income: 0, expenses: 0 }
  );

  // Prepare data for chart
  const data = [
    { name: "Inc", value: income },
    { name: "Exp", value: expenses },
  ];

  return (
    <div className="flex flex-col items-center">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
        <Tooltip
          formatter={(value) => formatAmount(value)} // Форматування сум в тултипі
        />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
