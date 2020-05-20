import jwtHelper from '../helpers/token';
import hashHelper from '../helpers/hashHelper';
import Response from '../helpers/Response';
import db from '../database/models';

const { User } = db;

class UserController{
    static async signup(req, res) {
        const { firstName, lastName, email, password } = req.body;
        const hashedPassword = hashHelper.hashPassword(password);
        const user = await User.create({
            firstName,
            lastName,
            password: hashedPassword,
            email
        });
        const { id, role } = user;
        const token = jwtHelper.generateToken({
            id,
            email,
            role
        });
        const response = new Response(
            true,
            201,
            'User signup successfully',
            { user: { email, token } }
        );
        return res.status(response.code).json(response);
    }

}

export default UserController;
