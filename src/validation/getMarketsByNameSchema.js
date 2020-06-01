import { query } from 'express-validator';
import capitalize from '../utils/capitalize';

/* eslint-disable arrow-parens */
const schema = [
    query('name')
        .trim()
        .exists().withMessage('name is required')
        .isLength({ min: 2, max: 100 }).withMessage('name is required and must not be less than two characters')
        .customSanitizer(value => capitalize(value)),
];

const getMarketBySchema = [
    ...schema,
];

export default getMarketBySchema;
