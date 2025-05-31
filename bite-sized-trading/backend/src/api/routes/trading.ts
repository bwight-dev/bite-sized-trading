import { Router } from 'express';
import { getTrades, createTrade, updateTrade, deleteTrade } from '../controllers/tradingController';

const router = Router();

// Route to get all trades
router.get('/trades', getTrades);

// Route to create a new trade
router.post('/trades', createTrade);

// Route to update an existing trade
router.put('/trades/:id', updateTrade);

// Route to delete a trade
router.delete('/trades/:id', deleteTrade);

export default router;