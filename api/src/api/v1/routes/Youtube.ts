/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Sun Mar 27 2022
 */

import express from 'express';
import controller from '../controllers/Youtube';
// import middleware from '../middlewares';

const router: express.Router = express.Router();

/**
 * @swagger
 * /api/v1/youtube/comments:
 *  get:
 *   tags: [Youtube]
 *   summary: Returns all comments for a given user based on Token.
 *   description: Returns all comments for a given user based on Token.
 *   security:
 *   - bearerAuth: []
 *   responses:
 *    '200':
 *      description: A successful response
*/
router.get('/youtube/comments', controller.getAllComments);

export default router;