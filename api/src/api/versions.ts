/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Sun Mar 27 2022
 */

import express from 'express';
import v1 from './v1';

const router: express.Router = express.Router();

/** V1 Routes */
router.use('/v1', v1);

export default router;
