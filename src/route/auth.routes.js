import { Router } from 'express';
import signUpSchema from '../validation/signUpSchema';
import loginSchema from '../validation/signinSchema';
import validator from '../middleware/validator';
import userController from '../controller/user';

const userRoutes = Router();

userRoutes.post(
    '/signup',
    validator(signUpSchema),
    userController.signup,
);

userRoutes.post(
    '/login',
    validator(loginSchema),
    userController.login,
);


export default userRoutes;
