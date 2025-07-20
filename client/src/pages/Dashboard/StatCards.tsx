import React, { useState, useEffect } from "react";
import { FiTrendingDown, FiTrendingUp } from "react-icons/fi";

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

export const StatCards = ( { expenses, incomes }: { expenses: Transaction[], incomes:Transaction[] } ) => {

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
  const totalIncomes = incomes.reduce((acc, curr) => acc + curr.amount, 0);
  const [ratio, setRatio] = useState(0);

  useEffect(() => {

    if (totalExpenses !== 0) {
      if (totalIncomes + totalExpenses > 0) {
        setRatio((totalIncomes / Math.abs(totalExpenses)*100));
      } else {
        setRatio((totalExpenses / Math.abs(totalIncomes)*100));
      }
    } else {
      if (totalIncomes > 0) {
        setRatio(100);
      } else {
        setRatio(0);
      }
    }

    console.log(ratio);

  }, [totalExpenses, totalIncomes]);

  return (
    <>
      <Card
        title="Current Balance"
        value={`$${(totalIncomes + totalExpenses).toFixed(2)}`}
        pillText={`$${Math.abs(ratio).toFixed(2)}%`}
        trend={ratio < 0 ? "down": "up"}
        
      />
      <Card
        title="Total Income"
        value={`$${totalIncomes.toFixed(2)}`}
        pillText=""
        trend={(Math.abs(totalIncomes) < Math.abs(totalExpenses)) ? "down": "up"}
        
      />
      <Card
        title="Total Expenses"
        value={`$${totalExpenses.toFixed(2)}`}
        pillText=""
        trend={(Math.abs(totalIncomes) > Math.abs(totalExpenses)) ? "down": "up"}
        
      />
    </>
  );
};

const Card = ({
  title,
  value,
  pillText,
  trend,
}: {
  title: string;
  value: string;
  pillText: string;
  trend: "up" | "down";
}) => {
  return (
    <div className="col-span-4 p-4 rounded border border-stone-300 h-24">
      <div className="flex mb-8 items-start justify-between">
        <div className="w-6/12">
          <h3 className="text-stone-500 mb-2 text-sm">{title}</h3>
          <p className="text-3xl font-semibold">{value}</p>
        </div>

        <div className="group">
          
        <span
          className={`text-xs flex items-center gap-1 font-medium px-2 py-1 rounded ${
            trend === "up"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-[#C63975]"
          }`}
        >
          {trend === "up" ? <FiTrendingUp /> : <FiTrendingDown />} {pillText}
        </span>
        
        </div>
      </div>

      
    </div>
  );
};