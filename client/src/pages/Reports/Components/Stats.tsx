import React, { useEffect, useState } from "react";
import { BiMoney, BiStats } from "react-icons/bi";
import { HiOutlineCreditCard } from "react-icons/hi";
import { Link } from "react-router-dom";

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

const calculateNetIncome = (incomes: Transaction[], expenses: Transaction[]) => {
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenses.reduce((sum, expense) => sum - expense.amount, 0);
  return totalIncome - totalExpense;
};

const calculateSavingsRate = (incomes: Transaction[], expenses: Transaction[]) => {
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  return totalIncome ? ((totalIncome - totalExpense) / totalIncome) * 100 : 0;
};

const calculateExpenseToIncomeRatio = (incomes: Transaction[], expenses: Transaction[]) => {
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenses.reduce((sum, expense) => sum - expense.amount, 0);
  return totalIncome ? (totalExpense / totalIncome) * 100 : 0;
};

const calculateIncomeToExpenseRatio = (incomes: Transaction[], expenses: Transaction[]) => {
  const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
  const totalExpense = expenses.reduce((sum, expense) => sum - expense.amount, 0);
  return totalExpense ? (totalIncome / totalExpense) * 100 : 0;
};

export const Stats = ({ expenses, incomes }: { expenses: Transaction[], incomes: Transaction[] }) => {
  const [netIncome, setNetIncome] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);
  const [expenseToIncomeRatio, setExpenseToIncomeRatio] = useState(0);
  const [incomeToExpenseRatio, setIncomeToExpenseRatio] = useState(0);

  useEffect(() => {
    setNetIncome(calculateNetIncome(incomes, expenses));
    setSavingsRate(calculateSavingsRate(incomes, expenses));
    setExpenseToIncomeRatio(calculateExpenseToIncomeRatio(incomes, expenses));
    setIncomeToExpenseRatio(calculateIncomeToExpenseRatio(incomes, expenses));
  }, [incomes, expenses]);

  return (
    <div className="p-4 rounded border border-stone-300 w-full h-full">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center font-medium gap-2">
          <BiStats className="mt-[2px]" size="20" /> Financial Statistics
        </h3>
      </div>
      <table className="w-full table-auto">
        <thead>
          <tr className="text-sm font-normal text-stone-500">
            <th className="text-start p-1.5">Statistic</th>
            <th className="text-start p-1.5">Value</th>
          </tr>
        </thead>
        <tbody>
          <tr className="bg-stone-200 text-sm">
            <td className="p-1.5 w-1/2">Net Income</td>
            <td className="text-start p-1.5">${netIncome.toFixed(2)}</td>
          </tr>
          <tr className="bg-gray-50 text-sm">
            <td className="p-1.5 m-1/2"></td>
            <td className="text-start p-1.5 h-8"></td>
          </tr>
          <tr className="bg-stone-200 text-sm">
            <td className="p-1.5 m-1/2">Savings Rate</td>
            <td className="text-start p-1.5">% {savingsRate.toFixed(2)}</td>
          </tr>
          <tr className="bg-gray-50 text-sm">
            <td className="p-1.5 m-1/2"></td>
            <td className="text-start p-1.5 h-8"></td>
          </tr>
          <tr className="bg-stone-200 text-sm">
            <td className="p-1.5 m-1/2">Expense-to-Income Ratio</td>
            <td className="text-start p-1.5">% {expenseToIncomeRatio.toFixed(2)}</td>
          </tr>
          <tr className="bg-gray-50 text-sm">
            <td className="p-1.5 m-1/2"></td>
            <td className="text-start p-1.5 h-8"></td>
          </tr>
          <tr className="bg-stone-200 text-sm">
            <td className="p-1.5 w-2/3">Income-to-Expense Ratio</td>
            <td className="text-start p-1.5">% {incomeToExpenseRatio.toFixed(2)}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

