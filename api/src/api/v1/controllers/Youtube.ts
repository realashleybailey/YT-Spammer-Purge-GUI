/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Sun Mar 27 2022
 */

import { NextFunction, Request, Response } from 'express';
import retrieveAllComments from '../helpers/retrieveAllComments';
import admin from '../services/firebase';
import commentToObject from '../helpers/commentToObject';
import replyToObject from '../helpers/replyToObject';

const getAllComments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Google Comments
  const comments = await retrieveAllComments();

  // Set Firestore
  const db = admin.firestore();
  const batch = db.batch();

  // Loop through comments
  comments.forEach((comment) => {
    // Create Comment Object
    const commentObject = commentToObject(comment);
    // Add Comment to Firestore batch
    batch.set(db.collection('users/31wYnob5M8rOeu6G0HjOlkAlkF6N/comments').doc(comment.id), commentObject);

    // Loop through replies if there are any
    if (comment.snippet.totalReplyCount > 0) {
      comment.replies.comments.forEach((reply) => {
        // Create Reply Object
        const replyObject = replyToObject(reply);
        // Add Reply to Firestore batch
        batch.set(db.collection('users/31wYnob5M8rOeu6G0HjOlkAlkF6N/replies').doc(reply.id.split('.')[1]), replyObject);
      });
    }
  });

  // Commit batch
  await batch.commit();

  res.status(200).json({ message: 'Comments Uploaded' });
};

export default { getAllComments };
