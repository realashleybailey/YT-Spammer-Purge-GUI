/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Sun Mar 27 2022
 */

import express, { Express } from 'express';
import http from 'http';
import routes from './api/versions';
import morgan from './morgan';
import swagger from './swagger';

const router: Express = express();

/** Logging */
if (!process.env.DISABLE_LOG) {
    router.use(morgan);
}

/** Parse the request */
router.use(express.urlencoded({ extended: false }));

/** Takes care of JSON data */
router.use(express.json());

/** RULES OF OUR API */
router.use((req, res, next) => {
    // set the CORS policy
    res.header('Access-Control-Allow-Origin', '*');
    // set the CORS headers
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
});

/** API Routes */
router.use('/api', routes);
router.use('/api-docs', swagger);

/** Error handling */
router.use('/', (req, res, next) => {
    const error = new Error('not found');
    return res.status(404).json({
        message: error.message
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 3000;
httpServer.listen(PORT, () => {
    if (!process.env.DISABLE_LOG) {
        console.log(`The server is running on port ${PORT}`);
    }
});

export default httpServer;
