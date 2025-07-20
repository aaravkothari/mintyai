import React, { useState, useEffect } from "react";
import { StatCards } from "./StatCards";
import { ActivityGraph } from "./ActivityGraph";
import { ExpenseChart } from "./ExpensesChart";
import { RecentTransactions } from "./RecentTransactions";
import axios from "axios";
import ProgressBars from "./Components/ProgressBars";

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}


export const Grid = () => {

  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [incomes, setIncome] = useState<Transaction[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/listtransactions");
        setTransactions(response.data);

        const temp_expenses: Transaction[] = [];
        const temp_incomes: Transaction[] = [];

        response.data.forEach((transaction: Transaction) => {
          if (transaction.type === "Expense") {
            temp_expenses.push(transaction);
          } else if (transaction.type === "Income") {
            temp_incomes.push(transaction);
          }
        });

        setExpenses(temp_expenses);
        setIncome(temp_incomes);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchTransactions();
  }, []);



  return (
    <div className="px-4 grid gap-3 grid-cols-12 ">
      <StatCards expenses={expenses} incomes={incomes} />
      <ProgressBars />
      <ActivityGraph expenses={expenses} incomes={incomes} />
      <ExpenseChart expenses={expenses} />
      <RecentTransactions  />
    </div>
  );
};