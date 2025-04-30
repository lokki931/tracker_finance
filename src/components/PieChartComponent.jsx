import { TransactionContext } from "@/context/TransactionContext";
import { useContext } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const COLORS = ["#00C49F", "#FF6384"]; // Green for Income, Red for Expenses

const PieChartComponent = () => {
  const { transactions } = useContext(TransactionContext);
  if (!transactions.length)
    return <p className="text-center text-gray-400">No data to display...</p>;

  // Summing income and expenses
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const expenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + Math.abs(t.amount), 0);

  // Prepare data for chart
  const data = [
    { name: "Plus", value: income },
    { name: "Minus", value: expenses },
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
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};

export default PieChartComponent;
