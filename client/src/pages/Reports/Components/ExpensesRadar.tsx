import React, { useEffect, useState } from "react";
import { PiChartPieSlice } from "react-icons/pi";
import {
  Radar,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

interface ExpenseData {
  feature: string;
  totalExpense: number;
  max: number;
}

const defaultCategories = ["Food", "Transport", "Shopping", "Entertainment", "Health", "Other"];

const CustomPolarAngleAxisTick = ({ payload, x, y, textAnchor, ...rest }: any) => {
  const isEntertainment = payload.value === "Entertainment";
  return (
    <text
      {...rest}
      x={x}
      y={isEntertainment ? y + 6 : y} // Adjust y position for "Entertainment"
      textAnchor={textAnchor}
      className="text-xs font-semibold"
    >
      {payload.value}
    </text>
  );
};

export const ExpensesRadar = ({ expenses }: { expenses: Transaction[] }) => {
  const [data, setData] = useState<ExpenseData[]>([]);

  useEffect(() => {
    const categories = Array.from(new Set([...defaultCategories, ...expenses.map(expense => expense.category)]));
    const aggregatedData = categories.map(category => {
      const totalExpense = expenses
        .filter(expense => expense.category === category)
        .reduce((sum, expense) => sum + Math.abs(expense.amount), 0);
      return { feature: category, totalExpense, max: 0 };
    });

    const maxExpense = Math.max(...aggregatedData.map(d => d.totalExpense));
    const dataWithMax = aggregatedData.map(d => ({ ...d, max: maxExpense }));

    setData(dataWithMax);
  }, [expenses]);

  return (
    <div className="overflow-hidden rounded border border-stone-300 w-full h-full">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <PiChartPieSlice className="mt-[2px]" size="20"/> Expense Radar
        </h3>
      </div>

      <div className="h-48 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="49%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="feature" tick={<CustomPolarAngleAxisTick />} />
            <Radar
              name="Cost"
              dataKey="totalExpense"
              stroke="#C63975"
              fill="#C63975"
              fillOpacity={0.2}
            />
            <Tooltip
              wrapperClassName="text-xs rounded"
              labelClassName="text-sm"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};