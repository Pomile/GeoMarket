import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const envSecret = process.env.TOKEN_SECRET;

/** Token Helper Class */
class Token {
    /**
     * @description - this method encodes a token
     * @param {object} payload
     * @param {string} secret
     * @param {string} expires
     * @return {string} token
     */
    static generateToken(payload, secret = envSecret, expires = '24h') {
        const token = jwt.sign({ payload }, secret, { expiresIn: expires });
        return token;
    }

}

export default Token;
