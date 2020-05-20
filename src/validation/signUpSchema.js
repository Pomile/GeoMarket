import { check } from 'express-validator';
import capitalize from '../utils/capitalize';

/* eslint-disable arrow-parens */
const schema = [
    check('firstName')
        .trim()
        .exists().withMessage('First name is required')
        .isLength({ min: 2, max: 15 })
        .withMessage('First name should be between 2 to 15 characters')
        .isAlpha()
        .withMessage('First name should only contain alphabets')
        .customSanitizer(value => capitalize(value)),

    check('lastName')
        .trim()
        .exists().withMessage('Last name is required')
        .isLength({ min: 2, max: 15 })
        .withMessage('Last name should be between 2 to 15 characters')
        .isAlpha()
        .withMessage('Last name should only contain alphabets')
        .customSanitizer(value => capitalize(value)),

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
        .withMessage('Password must be alphanumeric and not be less than 7 characters')
        .isAlphanumeric()
        .withMessage('Password must be alphanumeric and not be less than 7 characters'),
];

const signupSchema = [
    ...schema,
];

export default signupSchema;
