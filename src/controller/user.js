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

    static async login(req, res) {
        const { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        const error = new Response(
            false,
            401,
            'Incorrect email or password',
            {}
        );
        if (user) {
            const hash = user.password;
            const result = hashHelper.comparePassword(hash, password);
            if (result) {
                const {
                    id, role
                } = user;
                const token = jwtHelper.generateToken({
                    id,
                    email,
                    role,
                });
                const response = new Response(
                    true,
                    200,
                    'user logged in successfully',
                    { user: { email, token }, }
                );
                return res.status(response.code).json(response);
            } else {
                return res.status(error.code).json(error);
            }
        } else {
            
            return res.status(error.code).json(error);
        } 
        
    }
}

export default UserController;
