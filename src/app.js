import express from 'express';
import dotenv from 'dotenv';
import logger from 'morgan';
import debug from 'debug';
import multer from 'multer';
import cors from 'cors';
import routes from './route';
import models from './database/models';


const { NODE_ENV } = process.env;
const app = express();
const upload = multer();
dotenv.config();

var whitelist = ['http://localhost:3000'];
var corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
};

if (NODE_ENV === 'development' || NODE_ENV === 'production') {
    app.use(logger('dev'));
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(upload.single('file'));
app.get('/', (req, res) => {
    res.status(200).json({
        status: 200,
        message: 'Welcome to GeoMarket'
    });
});
app.use('/api/v1', routes);

const port = process.env.PORT || 3000;

app.listen(port);
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    debug.log(`Server is listening on http://localhost:${port}/`);
    models.sequelize.sync({ force: false });
}

export default app;