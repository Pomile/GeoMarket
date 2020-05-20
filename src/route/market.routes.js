import { Router } from 'express';

const marketRoutes = Router();

marketRoutes.get('/test', (req, res) => {
    res.status(200).json({ msg: 'Thank you for testing' });
});

export default marketRoutes;

