import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { parse } from 'date-fns';
import { Link } from 'react-router-dom';

interface Mastery {
  id: number;
  date: string;
  budget: number;
  budget_date: string;
  income_goal_date: string;
  income_goal: number;
}

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}


const ProgressBars = () => {

  const [mastery, setMastery] = useState<Mastery>();
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [totalExpenses, setTotalExpenses] = useState<number>(0);
  const [totalIncomes, setTotalIncomes] = useState<number>(0);

  useEffect(() => {
    getMastery();
  }, []);

  useEffect(() => {
    if (mastery) {
      getTransactions();
      console.log(mastery)
    }
  }, [mastery]);

  function getMastery() {
    axios
      .get("http://127.0.0.1:8080/listmasteries")
      .then(function (response) {
        const sortedMasteries = response.data.sort((a: Mastery, b: Mastery) => parse(b.date, 'yyyy-MM-dd', new Date()).getTime() - parse(a.date, 'yyyy-MM-dd', new Date()).getTime());
        setMastery(sortedMasteries[0]);
      });
  }

  function getTransactions() {
    axios
      .get("http://127.0.0.1:8080/listtransactions")
      .then(function (response) {
        const currentMonth = new Date().getMonth();
        const currentYear = new Date().getFullYear();
        const monthlyExpenses = response.data.filter((transaction: Transaction) => {
          const transactionDate = parse(transaction.date, 'yyyy-MM-dd', new Date());
          return transactionDate.getMonth() === currentMonth && transactionDate.getFullYear() === currentYear && transaction.type === "Expense";
        });
        const total = monthlyExpenses.reduce((sum: number, expense: Transaction) => sum + Math.abs(expense.amount), 0);
        setTotalExpenses(total);

        
        try {
        if (mastery) {
          const incomeStartDate = parse(mastery.income_goal_date, 'yyyy-MM-dd', new Date());
          
          const incomes = response.data.filter((transaction: Transaction) => {
            const transactionDate = parse(transaction.date, 'yyyy-MM-dd', new Date());
            return transactionDate >= incomeStartDate && transaction.type === "Income";
          });
          const totalIncome = incomes.reduce((sum: number, income: Transaction) => sum + income.amount, 0);
          setTotalIncomes(totalIncome);
        }
        } catch {
          console.log("Mastery not Found")
        }

      });
  }


  return (
    <>
    <Link to="/studentmastery" className="col-span-6 border border-stone-300 p-3 rounded-md transition-all duration-300 hover:shadow-md h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-medium mb-2">Budget Spent</h2>
        <h2 className="text-md font-medium mb-2">{mastery && ((totalExpenses / mastery?.budget) * 100).toFixed(2)}%</h2>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 m-1 mb-4 relative">
        <div className="bg-red-600 h-3 rounded-full" style={{ width: `${mastery && (totalExpenses / mastery?.budget) * 100}%` }}></div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-stone-500">Resets Monthly</p>
        <p className="text-xs text-stone-500">{totalExpenses.toFixed(2)} / {mastery?.budget.toFixed(2)}</p>
      </div>
    </Link>

    <Link to="/studentmastery" className="col-span-6 border border-stone-300 p-3 rounded-md transition-all duration-300 hover:shadow-md h-full">
      <div className="flex items-center justify-between">
        <h2 className="text-md font-medium mb-2">Income Goal Progress</h2>
        <h2 className="text-md font-medium mb-2">{mastery && ((totalIncomes / mastery?.income_goal) * 100).toFixed(2)}%</h2>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 m-1 mb-4 relative">
        <div className="bg-emerald-600 h-3 rounded-full" style={{ width: `${mastery && (totalIncomes / mastery?.income_goal) * 100}%` }}></div>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-xs text-stone-500">Resets Once Goal is Reached</p>
        <p className="text-xs text-stone-500">{totalIncomes.toFixed(2)} / {mastery?.income_goal.toFixed(2)}</p>
      </div>
      
    </Link>
    </>
  );
};

export default ProgressBars;
