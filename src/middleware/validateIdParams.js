import Response from '../helpers/response';
const validateId = (req, res, next) => {
    const { marketId } = req.params;
    if (Number.isInteger(+marketId) && +marketId > 0) {
        next();
    } else {
        const response = new Response(
            false,
            400,
            'Invalid id.id must be a positive integer and greater than 0.',
        );
        return res.status(response.code).json(response);
        
    }
};

export default validateId;
