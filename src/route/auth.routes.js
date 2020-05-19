import { Router } from 'express';

const userRoutes = Router();

userRoutes.get('/test', (req, res) => {
    res.status(200).json({ msg: 'Thank you for testing' });
});


export default userRoutes;
