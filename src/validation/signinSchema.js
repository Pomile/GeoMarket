import { check } from 'express-validator';

const schema = [
    check('email')
    .trim()
    .exists()
    .withMessage('Email address is required')
    .isEmail()
    .withMessage('Email address is invalid'),

    check('password')
        .trim()
        .exists().withMessage('Password is required')
        .isLength({ min: 7, })
        .withMessage('Password must not be less than 7 characters'),
];

const signinSchema = [
    ...schema,
];

export default signinSchema;