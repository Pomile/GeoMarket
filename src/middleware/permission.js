import Response from '../helpers/Response';


class Permission{
    static async permit(req, res, next) {
        const permited = ['admin'];
        const { payload } = req.payload;
        if (permited.indexOf(payload.role) !== -1) {
            next();
        } else {
            const response = new Response(false, 403, 'access denied', {});
            return res.status(response.code).json(response);
        }
    }
}

export default Permission;