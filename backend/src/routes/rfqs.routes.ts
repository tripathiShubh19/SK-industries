import { Router } from 'express';
import { submitRfq, getAllRfqs, getRfqById, updateRfqStatus } from '../controllers/rfqs.controller.js';

const router = Router();

router.post('/', submitRfq);
router.get('/', getAllRfqs);
router.get('/:id', getRfqById);
router.patch('/:id/status', updateRfqStatus);

export default router;
