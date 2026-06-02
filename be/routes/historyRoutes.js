import express from 'express';
import { getHistory, saveHistory, deleteHistory, authenticateToken } from '../controllers/historyController.js';

const router = express.Router();

// Apply auth middleware to protect all history routes
router.use(authenticateToken);

router.get('/', getHistory);
router.post('/', saveHistory);
router.delete('/:id', deleteHistory);

export default router;
