import { check, query } from 'express-validator';
import capitalize from '../utils/capitalize';


/* eslint-disable arrow-parens */
const schema = [
    query('limit')
        .trim()
        .exists().withMessage('limit is required')
        .isInt().withMessage('Limit must be an integer')
        .toInt(),
    query('offset')
        .trim()
        .exists().withMessage('offset is required')
        .isInt().withMessage('Offset must be an integer')
        .toInt(),
    query('category')
        .trim()
        .exists().withMessage('Market category is required')
        .isLength({ min: 2 }).withMessage('Category must not be empty')
        .customSanitizer(value => capitalize(value)),

];

const getMarketByCategorySchema = [
    ...schema,
];

export default getMarketByCategorySchema;
