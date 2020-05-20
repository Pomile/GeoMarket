import { check } from 'express-validator';
import capitalize from '../utils/capitalize';

/* eslint-disable arrow-parens */
const schema = [
    check('name')
        .trim()
        .exists().withMessage('name is required')
        .isLength({ min: 2, max: 100 }).withMessage('name must not be less than 2')
        .customSanitizer(value => capitalize(value)),

    check('category')
        .trim()
        .exists().withMessage('market is required')
        .isLength({ min: 2, max: 20 }).withMessage('market must not be less than 2')
        .customSanitizer(value => capitalize(value)),
    
    check('description')
        .trim()
        .exists().withMessage('description is required')
        .isLength({ min: 10, max: 200 }).withMessage('description must not be less than 10')
        .customSanitizer(value => capitalize(value)),
    check('street')
        .trim()
        .exists().withMessage('street is required')
        .isLength({ min: 5, max: 100 }).withMessage('street must not be less than 5')
        .customSanitizer(value => capitalize(value)),
    
    check('state')
        .trim()
        .exists().withMessage('state is required')
        .isLength({ min: 2 , max: 15}).withMessage('state must be less than 2')
        .customSanitizer(value => capitalize(value)),
    check('country')
        .trim()
        .exists().withMessage('country is required')
        .isLength({ min: 2, max: 20 }).withMessage('country must not be less than 2')
        .customSanitizer(value => capitalize(value)),
];

const marketSchema = [
    ...schema,
];

export default marketSchema;
