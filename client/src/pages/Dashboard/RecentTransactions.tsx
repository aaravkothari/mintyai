import React, { useEffect, useState } from "react";
import { FiArrowUpRight, FiDollarSign, FiMoreHorizontal } from "react-icons/fi";
import axios from "axios";
import { Link } from "react-router-dom";
import { HiOutlineCreditCard } from "react-icons/hi";

interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

export const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    getTransactions();
  }, []);

  function getTransactions() {
    axios
      .get("http://127.0.0.1:8080/listtransactions")
      .then(function (response) {
        const sortedTransactions = response.data
          .sort((a: Transaction, b: Transaction) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 6);
        setTransactions(sortedTransactions);
      });
  }

  return (
    <div className="col-span-12 p-4 rounded border border-stone-300">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="flex items-center gap-1.5 font-medium">
          <HiOutlineCreditCard className="mt-[2px]" size="20" /> Recent Transactions
        </h3>
        <Link to="/transactions" className="text-sm text-[#34b47d] hover:underline">
          See all
        </Link>
      </div>
      <table className="w-full table-auto">
        <TableHead />
        <tbody>
          {transactions.map((transaction, index) => (
            <TableRow
              key={transaction.id}
              transaction={transaction}
              order={index + 1}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const TableHead = () => {
  return (
    <thead>
      <tr className="text-sm font-normal text-stone-500">
        <th className="text-start p-1.5">Date</th>
        <th className="text-start p-1.5">Category</th>
        <th className="text-start p-1.5">Type</th>
        <th className="text-right p-1.5">Amount</th>
        <th className="text-right p-1.5">Description</th>
        <th className="w-8"></th>
      </tr>
    </thead>
  );
};

const TableRow = ({
  transaction,
  order,
}: {
  transaction: Transaction;
  order: number;
}) => {
  return (
    <tr className={order % 2 ? "bg-stone-100 text-sm" : "text-sm"}>
      <td className="p-1.5">{transaction.date}</td>
      <td className="p-1.5">{transaction.category}</td>
      <td className="p-1.5">{transaction.type}</td>
      <td className="p-1.5 text-right w-4">
        {transaction.amount < 0 ? `-$${Math.abs(transaction.amount).toFixed(2)}` : `+$${transaction.amount.toFixed(2)}`}
      </td>
      <td className="p-1.5 text-right">{transaction.description}</td>
      <td className="w-8">
        <Link to={`/transactions/transaction/${transaction.id}/edit`} className="hover:bg-stone-200 transition-colors grid place-content-center rounded text-sm size-8">
          <FiMoreHorizontal />
        </Link>
      </td>
    </tr>
  );
};