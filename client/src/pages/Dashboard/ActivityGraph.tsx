import React, { useEffect, useState } from "react";
import { FiActivity } from "react-icons/fi";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Line,
  LineChart,
} from "recharts";
import { format, subMonths } from "date-fns";

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

const getLastSixMonths = () => {
  const months = [];
  for (let i = 0; i < 6; i++) {
    months.push(format(subMonths(new Date(), i), "MMM"));
  }
  return months.reverse();
};

const aggregateData = (transactions: Transaction[], months: string[]) => {
  const data = months.map(month => ({
    name: month,
    Expenses: 0,
    Incomes: 0,
  }));

  transactions.forEach(transaction => {
    const transactionMonth = format(new Date(transaction.date), "MMM");
    const monthData = data.find(d => d.name === transactionMonth);
    if (monthData) {
      if (transaction.type === "Expense") {
        monthData.Expenses += Math.abs(transaction.amount);
      } else if (transaction.type === "Income") {
        monthData.Incomes += transaction.amount;
      }
    }
  });

  return data;
};

const getLeftMargin = (data: { Expenses: number, Incomes: number }[]) => {
  const maxValue = Math.max(...data.map(d => Math.max(d.Expenses, d.Incomes)));
  if (maxValue > 80000) {
    return -5;
  } else if (maxValue > 9999) {
    return -15;
  } else {
    return -20;
  }
};

export const ActivityGraph = ({ expenses, incomes }: { expenses: Transaction[], incomes: Transaction[] }) => {
  const [data, setData] = useState<{ name: string, Expenses: number, Incomes: number }[]>([]);

  useEffect(() => {
    const months = getLastSixMonths();
    const allTransactions = [...expenses, ...incomes];
    const aggregatedData = aggregateData(allTransactions, months);
    setData(aggregatedData);
  }, [expenses, incomes]);

  const leftMargin = getLeftMargin(data);

  return (
    <div className="col-span-8 overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <FiActivity /> Recent Activity
        </h3>
      </div>

      <div className="h-64 px-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={400}
            data={data}
            margin={{
              top: 0,
              right: 0,
              left: leftMargin,
              bottom: 0,
            }}
          >
            <CartesianGrid stroke="#e4e4e7" />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              className="text-xs font-bold"
              padding={{ right: 4 }}
            />
            <YAxis
              className="text-xs font-bold"
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              wrapperClassName="text-sm rounded"
              labelClassName="text-xs text-stone-500"
            />
            <Line
              type="monotone"
              dataKey="Incomes"
              stroke="#39C68A"
              fill="#39C68A"
              dot={{ fill: "#18181b", stroke:"none"}}
            />
            <Line
              type="monotone"
              dataKey="Expenses"
              stroke="#C63975"
              fill="#C63975"
              dot={{ fill: "#18181b", stroke:"none"}}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};