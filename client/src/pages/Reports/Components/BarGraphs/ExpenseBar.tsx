import React, { useEffect, useState } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { TbCategoryPlus } from "react-icons/tb";

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

const aggregateDataByCategory = (expenses: Transaction[]) => {
  const data: { category: string; totalExpense: number }[] = [];
  const categories = Array.from(new Set(expenses.map(expense => expense.category)));

  categories.forEach(category => {
    const totalExpense = expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + Math.abs(expense.amount), 0);
    data.push({ category, totalExpense });
  });

  return data;
};

export const ExpenseBar = ({ expenses }: { expenses: Transaction[] }) => {
  const [data, setData] = useState<{ category: string; totalExpense: number }[]>([]);

  useEffect(() => {
    const aggregatedData = aggregateDataByCategory(expenses);
    setData(aggregatedData);
  }, [expenses]);

  return (
    <div className="w-full overflow-hidden rounded border border-stone-300">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <TbCategoryPlus /> Expenses Categorized
        </h3>
      </div>

      <div className="h-[280px] px-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 5,
              left: 0,
              bottom: 5,
            }}
            barSize={30}
           
          >
            <XAxis tickLine={false} dataKey="category" scale="point" className="text-xs font-bold" padding={{ left: 30, right: 30 }} />
            <YAxis className="text-xs font-bold" tickLine={false} />
            <Tooltip />
            <CartesianGrid strokeDasharray="3 3" />
            <Bar dataKey="totalExpense" fill="#dc435e" background={{ fill: '#eee' }} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};