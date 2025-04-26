import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PlanningPage = () => {
  const [itinerary, setItinerary] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [item, setItem] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');

  const fetchItinerary = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/planning/itinerary");
      setItinerary(res.data);
    } catch (err) {
      console.error("Error fetching itinerary:", err);
    }
  };

  const fetchExpenses = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/planning/expenses");
      setExpenses(res.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  useEffect(() => {
    fetchItinerary();
    fetchExpenses();
  }, []);

  const handleAddItinerary = async () => {
    if (!item) return;
    await axios.post("http://localhost:8000/api/planning/itinerary", { item });
    setItem('');
    fetchItinerary();
  };

  const handleAddExpense = async () => {
    if (!description || !amount) return;
    await axios.post("http://localhost:8000/api/planning/expenses", {
      description,
      amount: parseFloat(amount)
    });
    setDescription('');
    setAmount('');
    fetchExpenses();
  };

  return (
    <div className="ml-[260px] px-4 sm:px-6 py-6 w-[calc(100%-260px)] overflow-x-hidden min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6">🗺️ Trip Planner</h1>

      {/* Itinerary Section */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Itinerary</h2>
        <div className="flex flex-col md:flex-row gap-2 mb-4">
          <input
            type="text"
            placeholder="Add activity..."
            value={item}
            onChange={(e) => setItem(e.target.value)}
            className="flex-1 p-2 border rounded"
          />
          <button
            onClick={handleAddItinerary}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
        <ul className="list-disc pl-6 space-y-1">
          {Array.isArray(itinerary) &&
            itinerary.map((i, idx) => <li key={idx}>{i.item}</li>)}
        </ul>
      </div>

      {/* Expense Section */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Expenses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="p-2 border rounded"
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="p-2 border rounded"
          />
          <button
            onClick={handleAddExpense}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 w-full"
          >
            Add Expense
          </button>
        </div>
        <ul className="space-y-1">
          {Array.isArray(expenses) &&
            expenses.map((e, idx) => (
              <li key={idx} className="flex justify-between">
                <span>{e.description}</span>
                <span className="text-right">₹{e.amount}</span>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default PlanningPage;
