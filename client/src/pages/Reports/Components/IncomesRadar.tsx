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

interface IncomeData {
  feature: string;
  totalIncome: number;
  max: number;
}

const defaultCategories = ["Salary", "Stocks", "Contract Work", "Investments", "Properties", "Gifts", "Other"];

const CustomPolarAngleAxisTick = ({ payload, x, y, textAnchor, ...rest }: any) => {
  const isSpecial = payload.value === "Investments" || payload.value === "Properties";
  return (
    <text
      {...rest}
      x={x}
      y={isSpecial ? y + 6 : y} // Adjust y position for "Investments" and "Properties"
      textAnchor={textAnchor}
      className="text-xs font-semibold"
    >
      {payload.value}
    </text>
  );
};

export const IncomesRadar = ({ incomes }: { incomes: Transaction[] }) => {
  const [data, setData] = useState<IncomeData[]>([]);

  useEffect(() => {
    const categories = Array.from(new Set([...defaultCategories, ...incomes.map(income => income.category)]));
    const aggregatedData = categories.map(category => {
      const totalIncome = incomes
        .filter(income => income.category === category)
        .reduce((sum, income) => sum + Math.abs(income.amount), 0);
      return { feature: category, totalIncome, max: 0 };
    });

    const maxIncome = Math.max(...aggregatedData.map(d => d.totalIncome));
    const dataWithMax = aggregatedData.map(d => ({ ...d, max: maxIncome }));

    setData(dataWithMax);
  }, [incomes]);

  return (
    <div className="overflow-hidden rounded border border-stone-300 w-full h-full">
      <div className="p-4">
        <h3 className="flex items-center gap-1.5 font-medium">
          <PiChartPieSlice className="mt-[2px]" size="20"/> Income Radar
        </h3>
      </div>

      <div className="h-48 pb-4">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="49%" cy="50%" outerRadius="70%" data={data}>
            <PolarGrid />
            <PolarAngleAxis dataKey="feature" tick={<CustomPolarAngleAxisTick />} />
            <Radar
              name="Income"
              dataKey="totalIncome"
              stroke="#34b47d"
              fill="#34b47d"
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