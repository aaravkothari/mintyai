import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { BsThreeDots } from "react-icons/bs";
import { MdDeleteOutline } from "react-icons/md";
import Select from "react-select";

// Define Transaction interface
interface Transaction {
  id: number;
  date: string;
  category: string;
  type: string;
  amount: number;
  description: string;
}

// Define FilterOptions interface
interface FilterOptions {
  startDate: string;
  endDate: string;
  categories: { value: string; label: string }[];
  types: string[];
  minAmount: string;
  maxAmount: string;
}

const List = () => {
  // Define transactions state
  const [transactions, setTransactions] = useState<Transaction[]>([]); 
  // Define searchQuery state
  const [searchQuery, setSearchQuery] = useState(''); 
  // Define filters state
  const [filters, setFilters] = useState<FilterOptions>({ 
    startDate: '',
    endDate: '',
    categories: [],
    types: [],
    minAmount: '',
    maxAmount: ''
  });

  // Fetch transactions from server and update transactions state
  useEffect(() => {
    getTransactions();
  }, []);

  function getTransactions() {
    axios
      .get("http://127.0.0.1:8080/listtransactions")
      .then(function (response) {
        // Sort transactions by date in descending 
        // order and store in transactions Array
        const sortedTransactions = response.data.sort(
          (a: Transaction, b: Transaction) => 
            new Date(b.date).getTime() - new Date(a.date).getTime());
        setTransactions(sortedTransactions); // Set transactions state
      });
  }

  const deleteTransaction = (id: number) => {
    axios
    // Send DELETE request to server
      .delete(`http://127.0.0.1:8080/transactiondelete/${id}`) 
      .then(function (response) {
        console.log(response.data);
        getTransactions(); // Fetch transactions again after deleting
      });
    alert("Successfully Deleted");
  };

  const handleFilterChange = (selectedOptions: any, actionMeta: any) => {
    setFilters({
      ...filters,
      [actionMeta.name]: selectedOptions
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleAmountChange = (e) => {
    const { name, value } = e.target;
    setFilters({
      ...filters,
      [name]: value
    });
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const selectedTypes = checked
      ? [...filters.types, value]
      : filters.types.filter((type) => type !== value);
    setFilters({ ...filters, types: selectedTypes });
  };

  const filteredTransactions = transactions.filter(transaction => {
    const transactionDate = new Date(transaction.date);
    const startDate = filters.startDate ? new Date(filters.startDate) : null;
    const endDate = filters.endDate ? new Date(filters.endDate) : null;
    const minAmount = filters.minAmount ? parseFloat(filters.minAmount) : null;
    const maxAmount = filters.maxAmount ? parseFloat(filters.maxAmount) : null;

    const matchesSearchQuery = 
      transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.amount.toString().toLowerCase().includes(searchQuery.toLowerCase());

    return (
      matchesSearchQuery &&
      (!startDate || transactionDate >= startDate) &&
      (!endDate || transactionDate <= endDate) &&
      (filters.categories.length === 0 || filters.categories.some(category => category.value === transaction.category)) &&
      (filters.types.length === 0 || filters.types.some(type => type === transaction.type)) &&
      (!minAmount || Math.abs(transaction.amount) >= minAmount) &&
      (!maxAmount || Math.abs(transaction.amount) <= maxAmount)
    );
  });

  const incomeCategoryOptions = [
    { value: 'Salary', label: 'Salary' },
    { value: 'Stocks', label: 'Stocks' },
    { value: 'Contract Work', label: 'Contract Work' },
    { value: 'Investments', label: 'Investments' },
    { value: 'Properties', label: 'Properties' },
    { value: 'Gifts', label: 'Gifts' },
    { value: 'Other', label: 'Other' },
  ];

  const expenseCategoryOptions = [
    { value: 'Food', label: 'Food' },
    { value: 'Transport', label: 'Transport' },
    { value: 'Shopping', label: 'Shopping' },
    { value: 'Entertainment', label: 'Entertainment' },
    { value: 'Health', label: 'Health' },
    { value: 'Other', label: 'Other' },
  ];

  const typeOptions = [
    { value: 'Income', label: 'Income' },
    { value: 'Expense', label: 'Expense' },
  ];

  return (
    <div className="overflow-x-auto">
      <div className="mt-4 mx-4">
        <input
          type="text"
          placeholder="Search Transactions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="border border-stone-300 rounded px-4 py-2 w-full text-sm"
        />
      </div>
      <div className="flex relative justify-between items-start p-4 h-full">
        <div className="w-1/4 border border-stone-300 mr-4 px-4 py-2 rounded">

          <div className="">
            <label className="block text-sm font-semibold mb-2 text-gray-500">Start Date</label>
            <input
              type="date"
              name="startDate"
              value={filters.startDate}
              onChange={handleDateChange}
              className="border border-stone-300 rounded px-4 py-2 w-full text-sm mb-2"
            />
          </div>
          <div className="mb-2">
            <label className="block text-sm font-semibold mb-2 text-gray-500">End Date</label>
            <input
              type="date"
              name="endDate"
              value={filters.endDate}
              onChange={handleDateChange}
              className="border border-stone-300 rounded px-4 py-2 w-full text-sm mb-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-500">Categories</label>
            <Select
              isMulti
              name="categories"
              options={incomeCategoryOptions.concat(expenseCategoryOptions)}
              className="basic-multi-select mb-2"
              classNamePrefix="select"
              onChange={handleFilterChange}
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-gray-500">Types</label>
            {typeOptions.map(type => (
              <div key={type.value} className="mb-2">
                <input
                  type="checkbox"
                  name="types"
                  value={type.value}
                  checked={filters.types.includes(type.value)}
                  onChange={handleTypeChange}
                  className="mr-2"
                />
                <label className="text-sm">{type.label}</label>
              </div>
            ))}
          </div>
          <div className="">
            <label className="block text-sm font-semibold mb-2 text-gray-500">Min Amount</label>
            <input
              type="number"
              name="minAmount"
              placeholder="Min Amount"
              value={filters.minAmount}
              onChange={handleAmountChange}
              className="border border-stone-300 rounded px-4 py-2 w-full text-sm mb-2"
            />
          </div>
          <div className="">
            <label className="block text-sm font-semibold mb-2 text-gray-500">Max Amount</label>
            <input
              type="number"
              name="maxAmount"
              placeholder="Max Amount"
              value={filters.maxAmount}
              onChange={handleAmountChange}
              className="border border-stone-300 rounded px-4 py-2 w-full text-sm mb-2"
            />
          </div>
        </div>
        <div className="border rounded border-stone-300 w-full overflow-y-auto">
          <table className="border-stone-300 text-sm">
            <thead className="border-b">
              <tr>
                <th className="py-2 px-4 text-left text-gray-500 font-bold">
                  Date
                </th>
                <th className="py-2 px-4 text-left text-gray-500 font-bold">
                  Category
                </th>
                <th className="py-2 px-4 text-left text-gray-500 font-bold">
                  Type
                </th>
                <th className="py-2 px-4 text-right text-gray-500 font-bold">
                  Amount
                </th>
                <th className="py-2 px-4 text-left text-gray-500 font-bold w-1/4">
                  Description
                </th>
                <th className="py-2 px-4 text-left text-gray-500 font-bold w-1/12">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No transactions match your search
                  </td>
                </tr>
              ) : (
                filteredTransactions.map((transaction, key) => (
                  <tr key={key} className={`border-b ${key % 2 === 0 ? "bg-gray-100" : "bg-white"} hover:bg-gray-200 transition duration-200`}>
                    <td className="py-2 px-4">{transaction.date}</td>
                    <td className="py-2 px-4">{transaction.category}</td>
                    <td className="py-2 px-4">{transaction.type}</td>
                    <td className="py-2 px-4 text-right">
                      {transaction.amount < 0 ? `-$${Math.abs(transaction.amount).toFixed(2)}` : `+$${transaction.amount.toFixed(2)}`}
                    </td>
                    <td className="py-2 px-4 w-1/4">{transaction.description}</td>
                    <td className="py-2 px-4 flex items-center w-1/12">
                      <Link
                        to={`transaction/${transaction.id}/edit`}
                        className="text-black px-4 py-2 rounded bg-gray-300 hover:bg-emerald-500 hover:text-white transition duration-200 mr-2"
                      >
                        <BsThreeDots size="15" />
                      </Link>
                      <button
                        onClick={() => deleteTransaction(transaction.id)}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-900 transition duration-200"
                      >
                        <MdDeleteOutline size="15" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default List;
