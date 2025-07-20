import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MdOutlineSaveAlt } from "react-icons/md";
import { IoReturnUpBackOutline } from "react-icons/io5";

export default function Create() {
  // initialize navigation hook
  const navigate = useNavigate();
  // initialize state for form inputs and errors
  const [inputs, setInputs] = useState({ date: "", category: "", type: "", amount: "", description: "" });
  const [errors, setErrors] = useState({ date: "", category: "", type: "", amount: "" });

  // handle input changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  // validate form inputs
  const validateInputs = () => {
    let valid = true;
    let errors = { date: "", category: "", type: "", amount: "" };

    // syntatical validation
    if (!inputs.date) {
      errors.date = "Date is required";
      valid = false;
    }
    // syntatical validation
    if (!inputs.category) {
      errors.category = "Category is required";
      valid = false;
    }
    // syntatical validation
    if (!inputs.type) {
      errors.type = "Type is required";
      valid = false;
    }
    // semantic validation
    // amount can not be negative when type is Income
    if (!inputs.amount || 
      (inputs.type === "Income" && parseFloat(inputs.amount) < 0)) {
      errors.amount = "Amount must be greater than 0";
      valid = false;
    }
    // semantic validation
    // description is optional
    if (!inputs.description) {
      inputs.description = "None";
    }

    setErrors(errors);
    return valid;
  };

  // handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    // format inputs before sending to server
    const formattedInputs = { ...inputs, date: new Date(inputs.date).toISOString().split('T')[0] };
    if (formattedInputs.type === "Expense") {
      formattedInputs.amount = (-Math.abs(parseFloat(formattedInputs.amount))).toFixed(2);
    } else {
      formattedInputs.amount = Math.abs(parseFloat(formattedInputs.amount)).toFixed(2);
    }

    console.log(formattedInputs);

    // send data to server
    axios.post("http://127.0.0.1:8080/transactionadd", formattedInputs).then(function (response) {
      console.log(response.data);
      navigate("/transactions");
    });
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Create Transaction</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              value={inputs.date}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="date"
              onChange={handleChange}
            />
            {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-700">Type</label>
            <select
              value={inputs.type}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="type"
              onChange={handleChange}
            >
              <option value="">Select Type</option>
              <option value="Income">Income</option>
              <option value="Expense">Expense</option>
            </select>
            {errors.type && <p className="text-red-500 text-xs mt-1">{errors.type}</p>}
          </div>

          {inputs.type === "Income" && (
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                value={inputs.category}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="category"
                onChange={handleChange}
              >
                <option value="">Select Income Category</option>
                <option value="Salary">Salary</option>
                <option value="Stocks">Stocks</option>
                <option value="Contract Work">Contract Work</option>
                <option value="Investments">Investments</option>
                <option value="Properties">Properties</option>
                <option value="Gifts">Gifts</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
          )}

          {inputs.type === "Expense" && (
            <div className="mb-4">
              <label className="block text-gray-700">Category</label>
              <select
                value={inputs.category}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                name="category"
                onChange={handleChange}
              >
                <option value="">Select Expense Category</option>
                <option value="Food">Food</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Health">Health</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
            </div>
          )}
          
          <div className="mb-4">
            {/** Syntatical Validation */}
            <label className="block text-gray-700">Amount</label>
            {/** Amount input must be a number */}
            <input
              placeholder="USD"
              step="0.01"
              type="number"
              value={inputs.amount}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-blue-500"
              name="amount"
              onChange={handleChange}
            />
            {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Description</label>
            <input
              type="text"
              placeholder="Optional"
              value={inputs.description}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              name="description"
              onChange={handleChange}
            />
          </div>
          <div className="justify-between flex items-center">
            <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition duration-200">
              <MdOutlineSaveAlt size="20" />
            </button>
            <button onClick={() => {navigate("/transactions")}} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
              <IoReturnUpBackOutline size="20" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

