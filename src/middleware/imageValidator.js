import Response from '../helpers/response';

const validateImage = (req, res, next) => {
    if (req.file === undefined || !['image/jpeg', 'image/jpg', 'image/png'].includes(req.file.mimetype)) {
        const response = new Response(
            false,
            400,
            'Unsupported image type',
        );
        return res.status(response.code).json(response);
    }
    next();
};

export default validateImage;
