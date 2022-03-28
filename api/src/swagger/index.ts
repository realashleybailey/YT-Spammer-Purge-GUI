/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Sun Mar 27 2022
 */

import express from 'express';
import fs from 'fs';
import path from 'path';
import swaggerJSdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from '../configs/swagger-config.json';

const router: express.Router = express.Router();

// Create swagger json file
const swaggerOptions = {
    definition: {
        ...swaggerDocument
    },
    apis: [
        path.join(__dirname, '../api/v1/routes/*')
    ]
};

// Create swagger json file
const swaggerDocs = swaggerJSdoc(swaggerOptions);
fs.writeFileSync(path.join(__dirname, './swagger.json'), JSON.stringify(swaggerDocs));

// Create swagger ui
router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

export default router;
