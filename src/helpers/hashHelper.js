import bcrypt from 'bcrypt-nodejs';
class Hash {
    /**
       * @description - hash password method
       * @param {string} password
       * @return {string} hashed password
       */
    static hashPassword(password) {
        return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
    }

}

export default Hash;
