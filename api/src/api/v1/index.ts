/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Sun Mar 27 2022
 */

import express from 'express';
import Youtube from './routes/Youtube';

const router: express.Router = express.Router();

/** V1 Routes */
router.use(Youtube);

export default router;
