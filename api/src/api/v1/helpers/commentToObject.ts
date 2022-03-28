import { Timestamp } from "firebase-admin/firestore";
import { youtube_v3 } from "googleapis";

const commentToObject = (comment: youtube_v3.Schema$CommentThread) => {

    // Get Comment
    const commentSnippet = comment.snippet;

    // Get Video ID
    const videoId = commentSnippet.videoId;

    // Get Comment ID
    const commentId = commentSnippet.topLevelComment.id;

    // Get Comment Text
    const commentText = commentSnippet.topLevelComment.snippet.textDisplay;

    // Get Comment Timestamp
    const commentTimestamp = new Date(
      commentSnippet.topLevelComment.snippet.publishedAt
    );

    // Get Comment Author
    const commentAuthor =
      commentSnippet.topLevelComment.snippet.authorDisplayName;

    // Get Comment Author Channel
    const commentAuthorChannel =
      commentSnippet.topLevelComment.snippet.authorChannelUrl;

    // Get Comment Author Channel ID
    const commentAuthorChannelId =
      commentSnippet.topLevelComment.snippet.authorChannelId.value;

    // Get Comment Author Profile Picture
    const commentAuthorProfilePicture =
      commentSnippet.topLevelComment.snippet.authorProfileImageUrl;

      // Get Comment Total Like Count
    const commentTotalLikeCount = commentSnippet.topLevelComment.snippet.likeCount;

    // Create Comment Object
    const commentObject = {
      type: 'comment',
      videoId: videoId,
      commentId: commentId,
      commentText: commentText,
      commentAuthor: commentAuthor,
      commentAuthorChannel: commentAuthorChannel,
      commentTotalLikeCount: commentTotalLikeCount,
      commentAuthorChannelId: commentAuthorChannelId,
      commentTimestamp: Timestamp.fromDate(commentTimestamp),
      commentAuthorProfilePicture: commentAuthorProfilePicture,
      createdAt: Timestamp.now(),
    };

    // Return Comment Object
    return commentObject;
}

export default commentToObject;