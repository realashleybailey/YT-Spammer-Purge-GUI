const reduceCommentLikeCount = (c: gapi.client.youtube.Comment, d: gapi.client.youtube.Comment) => {
  // If c is null, return d
  if (!c.snippet?.likeCount) {
    return d
  }

  // If d is null, return c
  if (!d.snippet?.likeCount) {
    return c
  }

  return c.snippet.likeCount > d.snippet.likeCount ? c : d
}

const reduceCommentLikeCountTopLevel = (a: gapi.client.youtube.CommentThread, b: gapi.client.youtube.CommentThread) => {
  // If a is null, return b
  if (!a.snippet?.topLevelComment?.snippet?.likeCount) {
    return b
  }

  // If b is null, return a
  if (!b.snippet?.topLevelComment?.snippet?.likeCount) {
    return a
  }

  return a.snippet.topLevelComment.snippet.likeCount > b.snippet.topLevelComment.snippet.likeCount ? a : b
}

const findMostLikedComment = (comments: gapi.client.youtube.CommentThread[]): gapi.client.youtube.Comment | null => {
  // Get the most liked comment from the array of comments
  const comment = comments.reduce(reduceCommentLikeCountTopLevel)

  // If the most liked comment exists then return it
  if (!comment) {
    return null
  }

  if (!comment.snippet || !comment.snippet.topLevelComment) {
    return null
  }

  return comment.snippet.topLevelComment
}

const findMostLikedReply = (comments: gapi.client.youtube.CommentThread[]): gapi.client.youtube.Comment | null => {
  // An array of the most liked replies from each comment
  const repliedArray: gapi.client.youtube.Comment[] = []

  // Loop through each comment
  comments.forEach((comment) => {
    // If the comment has replies then find the most liked reply
    if (comment.replies) {
      const mostLikedReply = comment.replies?.comments?.reduce(reduceCommentLikeCount)

      // If the most liked reply exists then add it to the array
      if (mostLikedReply) {
        repliedArray.push(mostLikedReply)
      }
    }
  })

  // Return the most liked reply from the array of most liked replies
  if (repliedArray.length > 0) {
    return repliedArray.reduce(reduceCommentLikeCount)
  }

  return null
}

export { reduceCommentLikeCount, reduceCommentLikeCountTopLevel, findMostLikedComment, findMostLikedReply }
