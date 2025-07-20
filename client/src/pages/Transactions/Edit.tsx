import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { MdOutlineSaveAlt } from "react-icons/md";

export default function Edit() {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({ date: "", category: "", type: "", amount: "", description: "" });
  const [errors, setErrors] = useState({ date: "", category: "", type: "", amount: "" });
  const { id } = useParams();

  useEffect(() => {
    getTransaction();
  }, []);

  function getTransaction() {
    axios.get(`http://127.0.0.1:8080/transactiondetails/${id}`).then(function (response) {
      console.log(response.data);
      setInputs({
        ...response.data,
        date: response.data.date.split("T")[0], // Format date to exclude time
      });
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  const validateInputs = () => {
    let valid = true;
    let errors = { date: "", category: "", type: "", amount: "" };

    if (!inputs.date) {
      errors.date = "Date is required";
      valid = false;
    }
    if (!inputs.category) {
      errors.category = "Category is required";
      valid = false;
    }
    if (!inputs.type) {
      errors.type = "Type is required";
      valid = false;
    }
    if (!inputs.amount) {
      errors.amount = "Amount is required";
      valid = false;
    }
    if (!inputs.description) {
      inputs.description = "None";
    }

    setErrors(errors);
    return valid;
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!validateInputs()) return;

    const formattedInputs = { ...inputs, date: new Date(inputs.date).toISOString().split('T')[0] };
    if (formattedInputs.type === "Expense") {
      formattedInputs.amount = (-Math.abs(parseFloat(formattedInputs.amount))).toFixed(2);
    } else {
      formattedInputs.amount = Math.abs(parseFloat(formattedInputs.amount)).toFixed(2);
    }

    axios.put(`http://127.0.0.1:8080/transactionupdate/${id}`, formattedInputs).then(function (response) {
      console.log(response.data);
      navigate("/transactions");
    });
  };

  const deleteTransaction = () => {
    axios
      .delete(`http://127.0.0.1:8080/transactiondelete/${id}`)
      .then(function (response) {
        console.log(response.data);
        navigate("/transactions");
      });
    alert("Successfully Deleted");
  };

  return (
    <div className="p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Edit Transaction</h1>
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
            <label className="block text-gray-700">Amount</label>
            <input
              placeholder="USD"
              step="0.01"
              type="number"
              value={inputs.amount}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          <button type="button" onClick={deleteTransaction} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200 ml-2">
            <MdDeleteOutline size="20" />
          </button>
          </div>
        </form>
      </div>
    </div>
  );
}

