import hash from '../../../helpers/hashHelper';
const users = [
    {
        firstName: 'admin',
        lastName: 'admin',
        email: 'test@theagromall.com',
        password: hash.hashPassword('password'),
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
    },
    {
        firstName: 'Babatunde',
        lastName: 'ogedengbe',
        email: 'soft-sky@live.co.uk',
        password: hash.hashPassword('password'),
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
    }
];

export default users;
