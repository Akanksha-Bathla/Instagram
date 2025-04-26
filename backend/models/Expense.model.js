import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  category: String,
  date: Date
});

const Expense = mongoose.model('Expense', expenseSchema);
export default Expense;
