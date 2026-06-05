import express from 'express';
import { getaiEdxplanation } from '../controllers/aiController.js';

const router = express.Router();

// Membuat endpoint POST /api/ai/explanation

router.post('/explanation', getaiEdxplanation);

export default router;