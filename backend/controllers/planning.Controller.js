import Itinerary from '../models/Itinerary.model.js';
import Expense from '../models/Expense.model.js';

// Add itinerary item
export const addItinerary = async (req, res) => {
  try {
    const newItem = await Itinerary.create({ item: req.body.item });
    res.status(201).json(newItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getItinerary = async (req, res) => {
  try {
    const items = await Itinerary.find();
    res.json(items);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add expense
export const addExpense = async (req, res) => {
  try {
    const newExpense = await Expense.create(req.body);
    res.status(201).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all expenses
export const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
