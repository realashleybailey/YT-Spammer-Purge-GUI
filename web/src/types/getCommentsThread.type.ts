export interface GetCommentsThread {
  /** Where to get comments from */
  queryLocation: {
    /** Returns the comment threads of the specified video. */
    videoId?: string
    /** Returns the comment threads for all the channel comments (ie does not include comments left on videos). */
    channelId?: string
    /** Returns the comment threads of all videos of the channel and the channel comments as well. */
    allThreadsRelatedToChannelId?: string
  }

  /** What to get */
  query: {
    maxResults: number
    part: Array<string>
  }

  /** How to get comments */
  pageToken?: string
}
