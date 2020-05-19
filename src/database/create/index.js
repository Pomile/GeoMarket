import dotenv from 'dotenv';
import createdb from './createDb';

dotenv.config();
const { NODE_ENV, DB_DEV_NAME, DB_TEST_NAME, DB_NAME } = process.env;
const dbName = NODE_ENV === 'production' ? DB_NAME : NODE_ENV === 'development' ? DB_DEV_NAME : DB_TEST_NAME;
createdb(dbName);
