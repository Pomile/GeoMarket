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

    /**
   * @description - this method compares password
   * @param {string} hashPassword
   * @param {string} password
   * @return {string} hashed password
   */
    static comparePassword(hashPassword, password) {
        return bcrypt.compareSync(password, hashPassword);
    }

}

export default Hash;
