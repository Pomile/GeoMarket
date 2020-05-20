import { Router } from 'express';
import marketSchema from '../validation/marketSchema';
import validator from '../middleware/validator';
import marketController from '../controller/market';
import VerifierMiddlewares from '../middleware/verifier';
import permission from '../middleware/permission';

const marketRoutes = Router();

marketRoutes.get('/test', (req, res) => {
    res.status(200).json({ msg: 'Thank you for testing' });
});

marketRoutes.post(
    '/',
    validator(marketSchema),
    VerifierMiddlewares.verifyToken,
    permission.permit,
    marketController.addMarket
);


export default marketRoutes;

