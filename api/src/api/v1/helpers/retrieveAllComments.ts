/*
 * Written by Ashley Bailey <admin@ashleybailey.me>
 * Description: Software Written By Ashley Bailey
 *
 * Created on Sun Mar 27 2022
 */

import { google, youtube_v3 } from 'googleapis';

const googleAuth = async () => {
  // Google Auth
  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/youtube.force-ssl'],
    keyFile: 'src/configs/service.json',
  });

  // Get Client
  const authClient = await auth.getClient();

  // Return Auth
  return authClient;
};

const retrieveAllComments = async (maxResults: number = 200) => {

  // Google Auth
  const authClient = await googleAuth();

  // Set Google API Options
  google.options({ auth: authClient });

  // Page Token and Total Comments
  let nextPageToken = '';
  let totalComments = 0;

  // Comments and Replies
  let comments = [];

  // Loop through pagination
  while (nextPageToken !== undefined && totalComments < maxResults) {

    // Get Comments
    const response = await google.youtube('v3').commentThreads.list({
      part: ['snippet', 'replies'],
      allThreadsRelatedToChannelId: 'UC_aE0rQ1_9rsTo4Iwb2rbwQ',
      maxResults: 100,
      textFormat: 'plainText',
      pageToken: nextPageToken
    });

    // Get Data
    const data = response.data;

    // Set Page Token and Total Comments
    totalComments = totalComments + data.pageInfo.resultsPerPage;
    nextPageToken = data.nextPageToken || undefined;
    
    // Set Comments
    comments = [...comments, ...data.items];

    // Console Log
    console.log(`${totalComments} comments retrieved`);
  }

  // Return Comments
  return comments as youtube_v3.Schema$CommentThread[];
};

export default retrieveAllComments;
