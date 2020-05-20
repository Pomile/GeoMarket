import { Router } from 'express';
import signUpSchema from '../validation/signUpSchema';
import validator from '../middleware/validator';
import userController from '../controller/user';

const userRoutes = Router();

userRoutes.post(
    '/signup',
    validator(signUpSchema),
    userController.signup,
);


export default userRoutes;
