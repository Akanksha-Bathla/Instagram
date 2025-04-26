import express from 'express';
import {
  addItinerary,
  getItinerary,
  addExpense,
  getExpenses
} from '../controllers/planning.Controller.js';
import isAuthenticated from '../middlewares/isAuthenticated.js';

const router = express.Router();

router.use(isAuthenticated);
router.post('/itinerary', addItinerary);
router.get('/itinerary', getItinerary);
router.post('/expenses', addExpense);
router.get('/expenses', getExpenses);


export default router;
