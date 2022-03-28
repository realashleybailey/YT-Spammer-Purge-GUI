import { Timestamp } from 'firebase-admin/firestore';
import { youtube_v3 } from 'googleapis';

const replyToObject = (reply: youtube_v3.Schema$Comment) => {

  // Get Comment
  const replySnippet = reply.snippet;

  // Get Video ID
  const videoId = replySnippet.videoId;

  // Get Reply ID
  const replyId = reply.id;

  // Get Reply Text
  const replyText = replySnippet.textDisplay;

  // Get Reply Timestamp
  const replyTimestamp = new Date(replySnippet.publishedAt);

  // Get Reply Author
  const replyAuthor = replySnippet.authorDisplayName;

  // Get Reply Author Channel
  const replyAuthorChannel = replySnippet.authorChannelUrl;

  // Get Reply Author Channel ID
  const replyAuthorChannelId = replySnippet.authorChannelId.value;

  // Get Reply Author Profile Picture
  const replyAuthorProfilePicture = replySnippet.authorProfileImageUrl;

  // Get Reply Total Like Count
  const replyTotalLikeCount = replySnippet.likeCount;

  // Create Comment Object
  const replyObject = {
    type: 'reply',
    videoId: videoId,
    commentId: replyId.split('.')[0],
    replyId: replyId.split('.')[1],
    replyText: replyText,
    replyAuthor: replyAuthor,
    replyAuthorChannel: replyAuthorChannel,
    replyTotalLikeCount: replyTotalLikeCount,
    replyAuthorChannelId: replyAuthorChannelId,
    replyTimestamp: Timestamp.fromDate(replyTimestamp),
    replyAuthorProfilePicture: replyAuthorProfilePicture,
    createdAt: Timestamp.now(),
  };

  // Return Comment Object
  return replyObject;

};

export default replyToObject;
