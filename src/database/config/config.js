import dotenv from 'dotenv';

dotenv.config();

const { DB_DEV_NAME, DB_USERNAME, DB_PASSWORD, DB_TEST_NAME, DB_HOST, DB_PORT } = process.env;
const dialect = 'postgres';

module.exports = {
    development: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_DEV_NAME,
        host: DB_HOST,
        port: DB_PORT,
        dialect,
    },
    test: {
        username: DB_USERNAME,
        password: DB_PASSWORD,
        database: DB_TEST_NAME,
        host: DB_HOST,
        port: DB_PORT,
        logging: false,
        dialect
    },
    production: {
        use_database_url: 'DATABASE_URL',
        dialect: 'postgres',
    },
};