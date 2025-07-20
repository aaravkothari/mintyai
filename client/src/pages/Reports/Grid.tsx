import React, { useEffect, useState } from 'react';
import { ActivityGraphs } from './Components/ActivityGraphs/BothActivity';
import axios from 'axios';
import { ExpensesRadar } from './Components/ExpensesRadar';
import { subDays, subMonths, subYears, isAfter } from 'date-fns';
import { IncomesRadar } from './Components/IncomesRadar';
import { ExpenseBar } from './Components/BarGraphs/ExpenseBar';
import { Stats } from './Components/Stats';

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

const Grid = ({ timeframe }: { timeframe: string }) => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [incomes, setIncome] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/listtransactions");
        setTransactions(response.data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

  useEffect(() => {
    const filterTransactionsByTimeframe = (transactions: Transaction[], timeframe: string) => {
      let startDate: Date;
      const now = new Date();

      switch (timeframe) {
        case "week1":
          startDate = subDays(now, 7);
          break;
        case "month1":
          startDate = subMonths(now, 1);
          break;
        case "month3":
          startDate = subMonths(now, 3);
          break;
        case "month6":
          startDate = subMonths(now, 6);
          break;
        case "year1":
          startDate = subYears(now, 1);
          break;
        case "year5":
          startDate = subYears(now, 5);
          break;
        default:
          startDate = subMonths(now, 6);
      }

      return transactions.filter(transaction => isAfter(new Date(transaction.date), startDate));
    };

    const filteredTransactions = filterTransactionsByTimeframe(transactions, timeframe);

    const temp_expenses: Transaction[] = [];
    const temp_incomes: Transaction[] = [];

    filteredTransactions.forEach((transaction: Transaction) => {
      if (transaction.type === "Expense") {
        temp_expenses.push(transaction);
      } else if (transaction.type === "Income") {
        temp_incomes.push(transaction);
      }
    });

    setExpenses(temp_expenses);
    setIncome(temp_incomes);
  }, [transactions, timeframe]);

  return (
    <>
    <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full px-4">
      <div className="col-span-2 row-span-2 flex items-center justify-center">
        <ActivityGraphs expenses={expenses} incomes={incomes} timeframe={timeframe} />
      </div>
      <div className="flex col-span-1 row-span-1 items-center justify-center">
        <ExpensesRadar expenses={expenses} />
      </div>
      <div className="flex col-span-1 row-span-1 items-center justify-center">
        <IncomesRadar incomes={incomes} />
      </div>
      
    </div>

    <div className="grid grid-cols-3 grid-rows-2 gap-4 h-full px-4 mt-4">
      <div className="flex col-span-1 row-span-2 items-center justify-center">
        <Stats expenses={expenses} incomes={incomes} />
      </div>
      <div className="col-span-2 row-span-2 flex items-center justify-center">
        <ExpenseBar expenses={expenses} />
      </div>
    </div>
    </>
  );
};

export default Grid;