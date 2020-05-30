import { query } from 'express-validator';
import capitalize from '../utils/capitalize';

/* eslint-disable arrow-parens */
const newSchema = [
    query('limit')
        .trim()
        .exists().withMessage('limit is required')
        .isInt().withMessage('Limit must be an integer')
        .toInt()
        .custom(value => value > 0).withMessage('limit must be greater than zero'),
    query('offset')
        .trim()
        .exists().withMessage('offset is required')
        .isInt().withMessage('Offset must be an integer')
        .toInt(),
    query('name')
        .trim()
        .exists().withMessage('Name is required')
        .isLength({ min: 2 }).withMessage('Name must be greater than one character')
        .customSanitizer(value => capitalize(value)),
    query('location')
        .trim()
        .exists().withMessage('Market location is required')
        .isLength({ min: 2 }).withMessage('Location must not be empty')
        .custom(value => {
            const location = value.split(', ');
            if (location.length < 2) {
                throw new Error('Invalid location, Please ensure you enter it correctly');
            }
            return true;
        })
        .customSanitizer(value => {
            const location = value.split(', ');
            const capLocation = location.map(item => capitalize(item));
            return capLocation.join(', ');
        }),

];

const getMarketsByNameAtLocationSchema = [
    ...newSchema,
];

export default getMarketsByNameAtLocationSchema;
