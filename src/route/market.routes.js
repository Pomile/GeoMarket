import { Router } from 'express';
import marketSchema from '../validation/marketSchema';
import getMarketSchema from '../validation/getMarketsByNameSchema';
import validator from '../middleware/validator';
import marketController from '../controller/market';
import VerifierMiddlewares from '../middleware/verifier';
import permission from '../middleware/permission';
import validateImage from '../middleware/imageValidator';
import validateId from '../middleware/validateIdParams';
import getMarketByCategorySchema from '../validation/getMarketsByCategory';
import getMarketsByCategoryAtLocationSchema from '../validation/getMarketsByCategoryAtLocationSchema';

const marketRoutes = Router();

marketRoutes.get('/test', (req, res) => {
    res.status(200).json({ msg: 'Thank you for testing' });
});
marketRoutes.post(
    '/:marketId',
    validateImage,
    VerifierMiddlewares.verifyToken,
    permission.permit,
    marketController.addMarketImage
);

marketRoutes.post(
    '/',
    validator(marketSchema),
    VerifierMiddlewares.verifyToken,
    permission.permit,
    marketController.addMarket
);

marketRoutes.get(
    '/',
    validator(getMarketSchema),
    marketController.getMarketByName
);

marketRoutes.patch(
    '/:marketId',
    validateId,
    validator(marketSchema),
    VerifierMiddlewares.verifyToken,
    permission.permit,
    marketController.modifyMarket
);

marketRoutes.delete(
    '/:marketId',
    validateId,
    VerifierMiddlewares.verifyToken,
    permission.permit,
    marketController.removeMarket
);
marketRoutes.get(
    '/category',
    validator(getMarketByCategorySchema),
    marketController.getMarketsByCategory
);
marketRoutes.get(
    '/category_location',
    validator(getMarketsByCategoryAtLocationSchema),
    marketController.getMarketsByCategoryAndLocation
);
marketRoutes.get(
    '/:marketId',
    validateId,
    marketController.getAMarket
);

marketRoutes.delete(
    '/images/:marketId',
    validateId,
    VerifierMiddlewares.verifyToken,
    permission.permit,
    marketController.removeMarketImage
);

export default marketRoutes;

