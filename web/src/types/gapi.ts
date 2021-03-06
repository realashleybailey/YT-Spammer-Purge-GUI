/* eslint-disable */

export namespace youtube {
  /**
   * An object containing information about the HTTP response
   */
  interface Response<T> {
    // The JSON-parsed result.
    result: T

    // The raw response string.
    body: string

    // The map of HTTP response headers.
    headers?: { [headerName: string]: string } | undefined

    // HTTP status
    status?: number | undefined

    // HTTP status text
    statusText?: string | undefined
  }

  /**
   * An object encapsulating an HTTP request. This object is not instantiated directly, rather it is returned by gapi.client.request.
   */
  interface Request<T> extends Promise<Response<T>> {
    /**
     * Executes the request and runs the supplied callback on response.
     * @param callback The callback function which executes when the request succeeds or fails.
     */
    execute(
      callback: (
        /**
         * contains the response parsed as JSON. If the response is not JSON, this field will be false.
         */
        response: Response<T>
      ) => any
    ): void
  }

  interface ResponseMap<T> {
    [id: string]: Response<T>
  }

  /**
   * Represents an HTTP Batch operation. Individual HTTP requests are added with the add method and the batch is executed using execute.
   */
  interface Batch<T> extends Promise<Response<ResponseMap<T>>> {
    /**
     * Adds a gapi.client.Request to the batch.
     * @param request The HTTP request to add to this batch.
     * @param opt_params extra parameters for this batch entry.
     */
    add<T>(
      request: Request<T>,
      opt_params?: {
        /**
         * Identifies the response for this request in the map of batch responses. If one is not provided, the system generates a random ID.
         */
        id: string
        callback(
          /**
           * is the response for this request only. Its format is defined by the API method being called.
           */
          individualResponse: Response<T>,
          /**
           * is the raw batch ID-response map as a string. It contains all responses to all requests in the batch.
           */
          rawBatchResponse: string
        ): any
      }
    ): void
    /**
     * Executes all requests in the batch. The supplied callback is executed on success or failure.
     * @param callback The callback to execute when the batch returns.
     */
    execute(
      callback: (
        /**
         * is an ID-response map of each requests response.
         */
        responseMap: ResponseMap<T>,
        /**
         * is the same response, but as an unparsed JSON-string.
         */
        rawBatchResponse: string
      ) => any
    ): void
  }

  interface AbuseReport {
    abuseTypes?: AbuseType[]
    description?: string
    relatedEntities?: RelatedEntity[]
    subject?: Entity
  }
  interface AbuseType {
    id?: string
  }
  interface AccessPolicy {
    /** The value of allowed indicates whether the access to the policy is allowed or denied by default. */
    allowed?: boolean
    /** A list of region codes that identify countries where the default policy do not apply. */
    exception?: string[]
  }
  interface Activity {
    /**
     * The contentDetails object contains information about the content associated with the activity. For example, if the snippet.type value is videoRated, then the contentDetails object's
     * content identifies the rated video.
     */
    contentDetails?: ActivityContentDetails
    /** Etag of this resource */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the activity. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#activity". */
    kind?: string
    /** The snippet object contains basic details about the activity, including the activity's type and group ID. */
    snippet?: ActivitySnippet
  }
  interface ActivityContentDetails {
    /** The bulletin object contains details about a channel bulletin post. This object is only present if the snippet.type is bulletin. */
    bulletin?: ActivityContentDetailsBulletin
    /** The channelItem object contains details about a resource which was added to a channel. This property is only present if the snippet.type is channelItem. */
    channelItem?: ActivityContentDetailsChannelItem
    /** The comment object contains information about a resource that received a comment. This property is only present if the snippet.type is comment. */
    comment?: ActivityContentDetailsComment
    /** The favorite object contains information about a video that was marked as a favorite video. This property is only present if the snippet.type is favorite. */
    favorite?: ActivityContentDetailsFavorite
    /** The like object contains information about a resource that received a positive (like) rating. This property is only present if the snippet.type is like. */
    like?: ActivityContentDetailsLike
    /** The playlistItem object contains information about a new playlist item. This property is only present if the snippet.type is playlistItem. */
    playlistItem?: ActivityContentDetailsPlaylistItem
    /** The promotedItem object contains details about a resource which is being promoted. This property is only present if the snippet.type is promotedItem. */
    promotedItem?: ActivityContentDetailsPromotedItem
    /** The recommendation object contains information about a recommended resource. This property is only present if the snippet.type is recommendation. */
    recommendation?: ActivityContentDetailsRecommendation
    /** The social object contains details about a social network post. This property is only present if the snippet.type is social. */
    social?: ActivityContentDetailsSocial
    /** The subscription object contains information about a channel that a user subscribed to. This property is only present if the snippet.type is subscription. */
    subscription?: ActivityContentDetailsSubscription
    /** The upload object contains information about the uploaded video. This property is only present if the snippet.type is upload. */
    upload?: ActivityContentDetailsUpload
  }
  interface ActivityContentDetailsBulletin {
    /** The resourceId object contains information that identifies the resource associated with a bulletin post. @mutable youtube.activities.insert */
    resourceId?: ResourceId
  }
  interface ActivityContentDetailsChannelItem {
    /** The resourceId object contains information that identifies the resource that was added to the channel. */
    resourceId?: ResourceId
  }
  interface ActivityContentDetailsComment {
    /** The resourceId object contains information that identifies the resource associated with the comment. */
    resourceId?: ResourceId
  }
  interface ActivityContentDetailsFavorite {
    /** The resourceId object contains information that identifies the resource that was marked as a favorite. */
    resourceId?: ResourceId
  }
  interface ActivityContentDetailsLike {
    /** The resourceId object contains information that identifies the rated resource. */
    resourceId?: ResourceId
  }
  interface ActivityContentDetailsPlaylistItem {
    /** The value that YouTube uses to uniquely identify the playlist. */
    playlistId?: string
    /** ID of the item within the playlist. */
    playlistItemId?: string
    /** The resourceId object contains information about the resource that was added to the playlist. */
    resourceId?: ResourceId
  }
  interface ActivityContentDetailsPromotedItem {
    /** The URL the client should fetch to request a promoted item. */
    adTag?: string
    /** The URL the client should ping to indicate that the user clicked through on this promoted item. */
    clickTrackingUrl?: string
    /** The URL the client should ping to indicate that the user was shown this promoted item. */
    creativeViewUrl?: string
    /** The type of call-to-action, a message to the user indicating action that can be taken. */
    ctaType?: string
    /** The custom call-to-action button text. If specified, it will override the default button text for the cta_type. */
    customCtaButtonText?: string
    /** The text description to accompany the promoted item. */
    descriptionText?: string
    /** The URL the client should direct the user to, if the user chooses to visit the advertiser's website. */
    destinationUrl?: string
    /** The list of forecasting URLs. The client should ping all of these URLs when a promoted item is not available, to indicate that a promoted item could have been shown. */
    forecastingUrl?: string[]
    /** The list of impression URLs. The client should ping all of these URLs to indicate that the user was shown this promoted item. */
    impressionUrl?: string[]
    /** The ID that YouTube uses to uniquely identify the promoted video. */
    videoId?: string
  }
  interface ActivityContentDetailsRecommendation {
    /** The reason that the resource is recommended to the user. */
    reason?: string
    /** The resourceId object contains information that identifies the recommended resource. */
    resourceId?: ResourceId
    /** The seedResourceId object contains information about the resource that caused the recommendation. */
    seedResourceId?: ResourceId
  }
  interface ActivityContentDetailsSocial {
    /** The author of the social network post. */
    author?: string
    /** An image of the post's author. */
    imageUrl?: string
    /** The URL of the social network post. */
    referenceUrl?: string
    /** The resourceId object encapsulates information that identifies the resource associated with a social network post. */
    resourceId?: ResourceId
    /** The name of the social network. */
    type?: string
  }
  interface ActivityContentDetailsSubscription {
    /** The resourceId object contains information that identifies the resource that the user subscribed to. */
    resourceId?: ResourceId
  }
  interface ActivityContentDetailsUpload {
    /** The ID that YouTube uses to uniquely identify the uploaded video. */
    videoId?: string
  }
  interface ActivityListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    items?: Activity[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#activityListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface ActivitySnippet {
    /** The ID that YouTube uses to uniquely identify the channel associated with the activity. */
    channelId?: string
    /** Channel title for the channel responsible for this activity */
    channelTitle?: string
    /** The description of the resource primarily associated with the activity. @mutable youtube.activities.insert */
    description?: string
    /**
     * The group ID associated with the activity. A group ID identifies user events that are associated with the same user and resource. For example, if a user rates a video and marks the
     * same video as a favorite, the entries for those events would have the same group ID in the user's activity feed. In your user interface, you can avoid repetition by grouping events
     * with the same groupId value.
     */
    groupId?: string
    /** The date and time that the video was uploaded. */
    publishedAt?: string
    /**
     * A map of thumbnail images associated with the resource that is primarily associated with the activity. For each object in the map, the key is the name of the thumbnail image, and
     * the value is an object that contains other information about the thumbnail.
     */
    thumbnails?: ThumbnailDetails
    /** The title of the resource primarily associated with the activity. */
    title?: string
    /** The type of activity that the resource describes. */
    type?: string
  }
  interface Caption {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the caption track. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#caption". */
    kind?: string
    /** The snippet object contains basic details about the caption. */
    snippet?: CaptionSnippet
  }
  interface CaptionListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of captions that match the request criteria. */
    items?: Caption[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#captionListResponse". */
    kind?: string
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface CaptionSnippet {
    /** The type of audio track associated with the caption track. */
    audioTrackType?: string
    /** The reason that YouTube failed to process the caption track. This property is only present if the state property's value is failed. */
    failureReason?: string
    /**
     * Indicates whether YouTube synchronized the caption track to the audio track in the video. The value will be true if a sync was explicitly requested when the caption track was
     * uploaded. For example, when calling the captions.insert or captions.update methods, you can set the sync parameter to true to instruct YouTube to sync the uploaded track to the
     * video. If the value is false, YouTube uses the time codes in the uploaded caption track to determine when to display captions.
     */
    isAutoSynced?: boolean
    /** Indicates whether the track contains closed captions for the deaf and hard of hearing. The default value is false. */
    isCC?: boolean
    /**
     * Indicates whether the caption track is a draft. If the value is true, then the track is not publicly visible. The default value is false. @mutable youtube.captions.insert
     * youtube.captions.update
     */
    isDraft?: boolean
    /** Indicates whether caption track is formatted for "easy reader," meaning it is at a third-grade level for language learners. The default value is false. */
    isEasyReader?: boolean
    /** Indicates whether the caption track uses large text for the vision-impaired. The default value is false. */
    isLarge?: boolean
    /** The language of the caption track. The property value is a BCP-47 language tag. */
    language?: string
    /** The date and time when the caption track was last updated. */
    lastUpdated?: string
    /** The name of the caption track. The name is intended to be visible to the user as an option during playback. */
    name?: string
    /** The caption track's status. */
    status?: string
    /** The caption track's type. */
    trackKind?: string
    /** The ID that YouTube uses to uniquely identify the video associated with the caption track. @mutable youtube.captions.insert */
    videoId?: string
  }
  interface CdnSettings {
    /** The format of the video stream that you are sending to Youtube. */
    format?: string
    /** The frame rate of the inbound video data. */
    frameRate?: string
    /** The ingestionInfo object contains information that YouTube provides that you need to transmit your RTMP or HTTP stream to YouTube. */
    ingestionInfo?: IngestionInfo
    /** The method or protocol used to transmit the video stream. */
    ingestionType?: string
    /** The resolution of the inbound video data. */
    resolution?: string
  }
  interface Channel {
    /** The auditionDetails object encapsulates channel data that is relevant for YouTube Partners during the audition process. */
    auditDetails?: ChannelAuditDetails
    /** The brandingSettings object encapsulates information about the branding of the channel. */
    brandingSettings?: ChannelBrandingSettings
    /** The contentDetails object encapsulates information about the channel's content. */
    contentDetails?: ChannelContentDetails
    /** The contentOwnerDetails object encapsulates channel data that is relevant for YouTube Partners linked with the channel. */
    contentOwnerDetails?: ChannelContentOwnerDetails
    /** The conversionPings object encapsulates information about conversion pings that need to be respected by the channel. */
    conversionPings?: ChannelConversionPings
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the channel. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#channel". */
    kind?: string
    /** Localizations for different languages */
    localizations?: { [P in string]: ChannelLocalization }
    /** The snippet object contains basic details about the channel, such as its title, description, and thumbnail images. */
    snippet?: ChannelSnippet
    /** The statistics object encapsulates statistics for the channel. */
    statistics?: ChannelStatistics
    /** The status object encapsulates information about the privacy status of the channel. */
    status?: ChannelStatus
    /** The topicDetails object encapsulates information about Freebase topics associated with the channel. */
    topicDetails?: ChannelTopicDetails
  }
  interface ChannelAuditDetails {
    /** Whether or not the channel respects the community guidelines. */
    communityGuidelinesGoodStanding?: boolean
    /** Whether or not the channel has any unresolved claims. */
    contentIdClaimsGoodStanding?: boolean
    /** Whether or not the channel has any copyright strikes. */
    copyrightStrikesGoodStanding?: boolean
  }
  interface ChannelBannerResource {
    etag?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelBannerResource". */
    kind?: string
    /** The URL of this banner image. */
    url?: string
  }
  interface ChannelBrandingSettings {
    /** Branding properties for the channel view. */
    channel?: ChannelSettings
    /** Additional experimental branding properties. */
    hints?: PropertyValue[]
    /** Branding properties for branding images. */
    image?: ImageSettings
    /** Branding properties for the watch page. */
    watch?: WatchSettings
  }
  interface ChannelContentDetails {
    relatedPlaylists?: {
      /** The ID of the playlist that contains the channel"s favorite videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list. */
      favorites?: string
      /** The ID of the playlist that contains the channel"s liked videos. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list. */
      likes?: string
      /**
       * The ID of the playlist that contains the channel"s uploaded videos. Use the videos.insert method to upload new videos and the videos.delete method to delete previously uploaded
       * videos.
       */
      uploads?: string
      /** The ID of the playlist that contains the channel"s watch history. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list. */
      watchHistory?: string
      /** The ID of the playlist that contains the channel"s watch later playlist. Use the playlistItems.insert and playlistItems.delete to add or remove items from that list. */
      watchLater?: string
    }
  }
  interface ChannelContentOwnerDetails {
    /** The ID of the content owner linked to the channel. */
    contentOwner?: string
    /** The date and time when the channel was linked to the content owner. */
    timeLinked?: string
  }
  interface ChannelConversionPing {
    /** Defines the context of the ping. */
    context?: string
    /**
     * The url (without the schema) that the player shall send the ping to. It's at caller's descretion to decide which schema to use (http vs https) Example of a returned url:
     * //googleads.g.doubleclick.net/pagead/ viewthroughconversion/962985656/?data=path%3DtHe_path%3Btype%3D cview%3Butuid%3DGISQtTNGYqaYl4sKxoVvKA&labe=default The caller must append
     * biscotti authentication (ms param in case of mobile, for example) to this ping.
     */
    conversionUrl?: string
  }
  interface ChannelConversionPings {
    /** Pings that the app shall fire (authenticated by biscotti cookie). Each ping has a context, in which the app must fire the ping, and a url identifying the ping. */
    pings?: ChannelConversionPing[]
  }
  interface ChannelListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    items?: Channel[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface ChannelLocalization {
    /** The localized strings for channel's description. */
    description?: string
    /** The localized strings for channel's title. */
    title?: string
  }
  interface ChannelProfileDetails {
    /** The YouTube channel ID. */
    channelId?: string
    /** The channel's URL. */
    channelUrl?: string
    /** The channel's display name. */
    displayName?: string
    /** The channels's avatar URL. */
    profileImageUrl?: string
  }
  interface ChannelSection {
    /** The contentDetails object contains details about the channel section content, such as a list of playlists or channels featured in the section. */
    contentDetails?: ChannelSectionContentDetails
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the channel section. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelSection". */
    kind?: string
    /** Localizations for different languages */
    localizations?: { [P in string]: ChannelSectionLocalization }
    /** The snippet object contains basic details about the channel section, such as its type, style and title. */
    snippet?: ChannelSectionSnippet
    /** The targeting object contains basic targeting settings about the channel section. */
    targeting?: ChannelSectionTargeting
  }
  interface ChannelSectionContentDetails {
    /** The channel ids for type multiple_channels. */
    channels?: string[]
    /** The playlist ids for type single_playlist and multiple_playlists. For singlePlaylist, only one playlistId is allowed. */
    playlists?: string[]
  }
  interface ChannelSectionListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of ChannelSections that match the request criteria. */
    items?: ChannelSection[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#channelSectionListResponse". */
    kind?: string
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface ChannelSectionLocalization {
    /** The localized strings for channel section's title. */
    title?: string
  }
  interface ChannelSectionSnippet {
    /** The ID that YouTube uses to uniquely identify the channel that published the channel section. */
    channelId?: string
    /** The language of the channel section's default title and description. */
    defaultLanguage?: string
    /** Localized title, read-only. */
    localized?: ChannelSectionLocalization
    /** The position of the channel section in the channel. */
    position?: number
    /** The style of the channel section. */
    style?: string
    /** The channel section's title for multiple_playlists and multiple_channels. */
    title?: string
    /** The type of the channel section. */
    type?: string
  }
  interface ChannelSectionTargeting {
    /** The country the channel section is targeting. */
    countries?: string[]
    /** The language the channel section is targeting. */
    languages?: string[]
    /** The region the channel section is targeting. */
    regions?: string[]
  }
  interface ChannelSettings {
    /** The country of the channel. */
    country?: string
    defaultLanguage?: string
    /** Which content tab users should see when viewing the channel. */
    defaultTab?: string
    /** Specifies the channel description. */
    description?: string
    /** Title for the featured channels tab. */
    featuredChannelsTitle?: string
    /** The list of featured channels. */
    featuredChannelsUrls?: string[]
    /** Lists keywords associated with the channel, comma-separated. */
    keywords?: string
    /** Whether user-submitted comments left on the channel page need to be approved by the channel owner to be publicly visible. */
    moderateComments?: boolean
    /** A prominent color that can be rendered on this channel page. */
    profileColor?: string
    /** Whether the tab to browse the videos should be displayed. */
    showBrowseView?: boolean
    /** Whether related channels should be proposed. */
    showRelatedChannels?: boolean
    /** Specifies the channel title. */
    title?: string
    /** The ID for a Google Analytics account to track and measure traffic to the channels. */
    trackingAnalyticsAccountId?: string
    /** The trailer of the channel, for users that are not subscribers. */
    unsubscribedTrailer?: string
  }
  interface ChannelSnippet {
    /** The country of the channel. */
    country?: string
    /** The custom url of the channel. */
    customUrl?: string
    /** The language of the channel's default title and description. */
    defaultLanguage?: string
    /** The description of the channel. */
    description?: string
    /** Localized title and description, read-only. */
    localized?: ChannelLocalization
    /** The date and time that the channel was created. */
    publishedAt?: string
    /**
     * A map of thumbnail images associated with the channel. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
     * information about the thumbnail. When displaying thumbnails in your application, make sure that your code uses the image URLs exactly as they are returned in API responses. For
     * example, your application should not use the http domain instead of the https domain in a URL returned in an API response. Beginning in July 2018, channel thumbnail URLs will only
     * be available in the https domain, which is how the URLs appear in API responses. After that time, you might see broken images in your application if it tries to load YouTube images
     * from the http domain. Thumbnail images might be empty for newly created channels and might take up to one day to populate.
     */
    thumbnails?: ThumbnailDetails
    /** The channel's title. */
    title?: string
  }
  interface ChannelStatistics {
    /** The number of comments for the channel. */
    commentCount?: string
    /** Whether or not the number of subscribers is shown for this user. */
    hiddenSubscriberCount?: boolean
    /** The number of subscribers that the channel has. */
    subscriberCount?: string
    /** The number of videos uploaded to the channel. */
    videoCount?: string
    /** The number of times the channel has been viewed. */
    viewCount?: string
  }
  interface ChannelStatus {
    /** If true, then the user is linked to either a YouTube username or G+ account. Otherwise, the user doesn't have a public YouTube identity. */
    isLinked?: boolean
    /** The long uploads status of this channel. See https://support.google.com/youtube/answer/71673 for more information. */
    longUploadsStatus?: string
    madeForKids?: boolean
    /** Privacy status of the channel. */
    privacyStatus?: string
    selfDeclaredMadeForKids?: boolean
  }
  interface ChannelTopicDetails {
    /** A list of Wikipedia URLs that describe the channel's content. */
    topicCategories?: string[]
    /** A list of Freebase topic IDs associated with the channel. You can retrieve information about each topic using the Freebase Topic API. */
    topicIds?: string[]
  }
  interface ChannelToStoreLinkDetails {
    /** Google Merchant Center id of the store. */
    merchantId?: string
    /** Name of the store. */
    storeName?: string
    /** Landing page of the store. */
    storeUrl?: string
  }
  interface Comment {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the comment. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#comment". */
    kind?: string
    /** The snippet object contains basic details about the comment. */
    snippet?: CommentSnippet
  }
  interface CommentListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of comments that match the request criteria. */
    items?: Comment[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#commentListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface CommentSnippet {
    authorChannelId?: CommentSnippetAuthorChannelId
    /** Link to the author's YouTube channel, if any. */
    authorChannelUrl?: string
    /** The name of the user who posted the comment. */
    authorDisplayName?: string
    /** The URL for the avatar of the user who posted the comment. */
    authorProfileImageUrl?: string
    /** Whether the current viewer can rate this comment. */
    canRate?: boolean
    /** The id of the corresponding YouTube channel. In case of a channel comment this is the channel the comment refers to. In case of a video comment it's the video's channel. */
    channelId?: string
    /** The total number of likes this comment has received. */
    likeCount?: number
    /** The comment's moderation status. Will not be set if the comments were requested through the id filter. */
    moderationStatus?: string
    /** The unique id of the parent comment, only set for replies. */
    parentId?: string
    /** The date and time when the comment was originally published. */
    publishedAt?: string
    /**
     * The comment's text. The format is either plain text or HTML dependent on what has been requested. Even the plain text representation may differ from the text originally posted in
     * that it may replace video links with video titles etc.
     */
    textDisplay?: string
    /**
     * The comment's original raw text as initially posted or last updated. The original text will only be returned if it is accessible to the viewer, which is only guaranteed if the
     * viewer is the comment's author.
     */
    textOriginal?: string
    /** The date and time when the comment was last updated. */
    updatedAt?: string
    /** The ID of the video the comment refers to, if any. */
    videoId?: string
    /** The rating the viewer has given to this comment. For the time being this will never return RATE_TYPE_DISLIKE and instead return RATE_TYPE_NONE. This may change in the future. */
    viewerRating?: string
  }
  interface CommentSnippetAuthorChannelId {
    value?: string
  }
  interface CommentThread {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the comment thread. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#commentThread". */
    kind?: string
    /** The replies object contains a limited number of replies (if any) to the top level comment found in the snippet. */
    replies?: CommentThreadReplies
    /** The snippet object contains basic details about the comment thread and also the top level comment. */
    snippet?: CommentThreadSnippet
  }
  interface CommentThreadListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of comment threads that match the request criteria. */
    items?: CommentThread[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#commentThreadListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface CommentThreadReplies {
    /** A limited number of replies. Unless the number of replies returned equals total_reply_count in the snippet the returned replies are only a subset of the total number of replies. */
    comments?: Comment[]
  }
  interface CommentThreadSnippet {
    /** Whether the current viewer of the thread can reply to it. This is viewer specific - other viewers may see a different value for this field. */
    canReply?: boolean
    /** The YouTube channel the comments in the thread refer to or the channel with the video the comments refer to. If video_id isn't set the comments refer to the channel itself. */
    channelId?: string
    /** Whether the thread (and therefore all its comments) is visible to all YouTube users. */
    isPublic?: boolean
    /** The top level comment of this thread. */
    topLevelComment?: Comment
    /** The total number of replies (not including the top level comment). */
    totalReplyCount?: number
    /** The ID of the video the comments refer to, if any. No video_id implies a channel discussion comment. */
    videoId?: string
  }
  interface ContentRating {
    /**
     * The video's Australian Classification Board (ACB) or Australian Communications and Media Authority (ACMA) rating. ACMA ratings are used to classify children's television
     * programming.
     */
    acbRating?: string
    /** The video's rating from Italy's Autorit?? per le Garanzie nelle Comunicazioni (AGCOM). */
    agcomRating?: string
    /** The video's Anatel (Asociaci??n Nacional de Televisi??n) rating for Chilean television. */
    anatelRating?: string
    /** The video's British Board of Film Classification (BBFC) rating. */
    bbfcRating?: string
    /** The video's rating from Thailand's Board of Film and Video Censors. */
    bfvcRating?: string
    /** The video's rating from the Austrian Board of Media Classification (Bundesministerium f??r Unterricht, Kunst und Kultur). */
    bmukkRating?: string
    /**
     * The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian French-language broadcasts. For more information, see the Canadian
     * Broadcast Standards Council website.
     */
    catvfrRating?: string
    /**
     * Rating system for Canadian TV - Canadian TV Classification System The video's rating from the Canadian Radio-Television and Telecommunications Commission (CRTC) for Canadian
     * English-language broadcasts. For more information, see the Canadian Broadcast Standards Council website.
     */
    catvRating?: string
    /** The video's Central Board of Film Certification (CBFC - India) rating. */
    cbfcRating?: string
    /** The video's Consejo de Calificaci??n Cinematogr??fica (Chile) rating. */
    cccRating?: string
    /** The video's rating from Portugal's Comiss??o de Classifica????o de Espect??culos. */
    cceRating?: string
    /** The video's rating in Switzerland. */
    chfilmRating?: string
    /** The video's Canadian Home Video Rating System (CHVRS) rating. */
    chvrsRating?: string
    /** The video's rating from the Commission de Contr??le des Films (Belgium). */
    cicfRating?: string
    /** The video's rating from Romania's CONSILIUL NATIONAL AL AUDIOVIZUALULUI (CNA). */
    cnaRating?: string
    /** Rating system in France - Commission de classification cinematographique */
    cncRating?: string
    /** The video's rating from France's Conseil sup??rieur de l???audiovisuel, which rates broadcast content. */
    csaRating?: string
    /** The video's rating from Luxembourg's Commission de surveillance de la classification des films (CSCF). */
    cscfRating?: string
    /** The video's rating in the Czech Republic. */
    czfilmRating?: string
    /** The video's Departamento de Justi??a, Classifica????o, Qualifica????o e T??tulos (DJCQT - Brazil) rating. */
    djctqRating?: string
    /** Reasons that explain why the video received its DJCQT (Brazil) rating. */
    djctqRatingReasons?: string[]
    /** Rating system in Turkey - Evaluation and Classification Board of the Ministry of Culture and Tourism */
    ecbmctRating?: string
    /** The video's rating in Estonia. */
    eefilmRating?: string
    /** The video's rating in Egypt. */
    egfilmRating?: string
    /** The video's Eirin (??????) rating. Eirin is the Japanese rating system. */
    eirinRating?: string
    /** The video's rating from Malaysia's Film Censorship Board. */
    fcbmRating?: string
    /** The video's rating from Hong Kong's Office for Film, Newspaper and Article Administration. */
    fcoRating?: string
    /** This property has been deprecated. Use the contentDetails.contentRating.cncRating instead. */
    fmocRating?: string
    /** The video's rating from South Africa's Film and Publication Board. */
    fpbRating?: string
    /** Reasons that explain why the video received its FPB (South Africa) rating. */
    fpbRatingReasons?: string[]
    /** The video's Freiwillige Selbstkontrolle der Filmwirtschaft (FSK - Germany) rating. */
    fskRating?: string
    /** The video's rating in Greece. */
    grfilmRating?: string
    /** The video's Instituto de la Cinematograf??a y de las Artes Audiovisuales (ICAA - Spain) rating. */
    icaaRating?: string
    /** The video's Irish Film Classification Office (IFCO - Ireland) rating. See the IFCO website for more information. */
    ifcoRating?: string
    /** The video's rating in Israel. */
    ilfilmRating?: string
    /** The video's INCAA (Instituto Nacional de Cine y Artes Audiovisuales - Argentina) rating. */
    incaaRating?: string
    /** The video's rating from the Kenya Film Classification Board. */
    kfcbRating?: string
    /** The video's NICAM/Kijkwijzer rating from the Nederlands Instituut voor de Classificatie van Audiovisuele Media (Netherlands). */
    kijkwijzerRating?: string
    /** The video's Korea Media Rating Board (????????????????????????) rating. The KMRB rates videos in South Korea. */
    kmrbRating?: string
    /** The video's rating from Indonesia's Lembaga Sensor Film. */
    lsfRating?: string
    /** The video's rating from Malta's Film Age-Classification Board. */
    mccaaRating?: string
    /** The video's rating from the Danish Film Institute's (Det Danske Filminstitut) Media Council for Children and Young People. */
    mccypRating?: string
    /** The video's rating system for Vietnam - MCST */
    mcstRating?: string
    /** The video's rating from Singapore's Media Development Authority (MDA) and, specifically, it's Board of Film Censors (BFC). */
    mdaRating?: string
    /** The video's rating from Medietilsynet, the Norwegian Media Authority. */
    medietilsynetRating?: string
    /** The video's rating from Finland's Kansallinen Audiovisuaalinen Instituutti (National Audiovisual Institute). */
    mekuRating?: string
    /**
     * The rating system for MENA countries, a clone of MPAA. It is needed to prevent titles go live w/o additional QC check, since some of them can be inappropriate for the countries at
     * all. See b/33408548 for more details.
     */
    menaMpaaRating?: string
    /** The video's rating from the Ministero dei Beni e delle Attivit?? Culturali e del Turismo (Italy). */
    mibacRating?: string
    /** The video's Ministerio de Cultura (Colombia) rating. */
    mocRating?: string
    /** The video's rating from Taiwan's Ministry of Culture (?????????). */
    moctwRating?: string
    /** The video's Motion Picture Association of America (MPAA) rating. */
    mpaaRating?: string
    /** The rating system for trailer, DVD, and Ad in the US. See http://movielabs.com/md/ratings/v2.3/html/US_MPAAT_Ratings.html. */
    mpaatRating?: string
    /** The video's rating from the Movie and Television Review and Classification Board (Philippines). */
    mtrcbRating?: string
    /** The video's rating in Poland. */
    nbcplRating?: string
    /** The video's rating from the Maldives National Bureau of Classification. */
    nbcRating?: string
    /** The video's rating from the Bulgarian National Film Center. */
    nfrcRating?: string
    /** The video's rating from Nigeria's National Film and Video Censors Board. */
    nfvcbRating?: string
    /** The video's rating from the Nacion??lais Kino centrs (National Film Centre of Latvia). */
    nkclvRating?: string
    /** The National Media Council ratings system for United Arab Emirates. */
    nmcRating?: string
    /** The video's Office of Film and Literature Classification (OFLC - New Zealand) rating. */
    oflcRating?: string
    /** The video's rating in Peru. */
    pefilmRating?: string
    /** The video's rating from the Hungarian Nemzeti Filmiroda, the Rating Committee of the National Office of Film. */
    rcnofRating?: string
    /** The video's rating in Venezuela. */
    resorteviolenciaRating?: string
    /** The video's General Directorate of Radio, Television and Cinematography (Mexico) rating. */
    rtcRating?: string
    /** The video's rating from Ireland's Raidi?? Teilif??s ??ireann. */
    rteRating?: string
    /** The video's National Film Registry of the Russian Federation (MKRF - Russia) rating. */
    russiaRating?: string
    /** The video's rating in Slovakia. */
    skfilmRating?: string
    /** The video's rating in Iceland. */
    smaisRating?: string
    /** The video's rating from Statens medier??d (Sweden's National Media Council). */
    smsaRating?: string
    /** The video's TV Parental Guidelines (TVPG) rating. */
    tvpgRating?: string
    /** A rating that YouTube uses to identify age-restricted content. */
    ytRating?: string
  }
  interface Entity {
    id?: string
    typeId?: string
    url?: string
  }
  interface GeoPoint {
    /** Altitude above the reference ellipsoid, in meters. */
    altitude?: number
    /** Latitude in degrees. */
    latitude?: number
    /** Longitude in degrees. */
    longitude?: number
  }
  // tslint:disable-next-line:interface-name
  interface I18nLanguage {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the i18n language. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguage". */
    kind?: string
    /** The snippet object contains basic details about the i18n language, such as language code and human-readable name. */
    snippet?: I18nLanguageSnippet
  }
  // tslint:disable-next-line:interface-name
  interface I18nLanguageListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of supported i18n languages. In this map, the i18n language ID is the map key, and its value is the corresponding i18nLanguage resource. */
    items?: I18nLanguage[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#i18nLanguageListResponse". */
    kind?: string
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  // tslint:disable-next-line:interface-name
  interface I18nLanguageSnippet {
    /** A short BCP-47 code that uniquely identifies a language. */
    hl?: string
    /** The human-readable name of the language in the language itself. */
    name?: string
  }
  // tslint:disable-next-line:interface-name
  interface I18nRegion {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the i18n region. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegion". */
    kind?: string
    /** The snippet object contains basic details about the i18n region, such as region code and human-readable name. */
    snippet?: I18nRegionSnippet
  }
  // tslint:disable-next-line:interface-name
  interface I18nRegionListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of regions where YouTube is available. In this map, the i18n region ID is the map key, and its value is the corresponding i18nRegion resource. */
    items?: I18nRegion[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#i18nRegionListResponse". */
    kind?: string
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  // tslint:disable-next-line:interface-name
  interface I18nRegionSnippet {
    /** The region code as a 2-letter ISO country code. */
    gl?: string
    /** The human-readable name of the region. */
    name?: string
  }
  interface ImageSettings {
    /** The URL for the background image shown on the video watch page. The image should be 1200px by 615px, with a maximum file size of 128k. */
    backgroundImageUrl?: LocalizedProperty
    /** This is generated when a ChannelBanner.Insert request has succeeded for the given channel. */
    bannerExternalUrl?: string
    /** Banner image. Desktop size (1060x175). */
    bannerImageUrl?: string
    /** Banner image. Mobile size high resolution (1440x395). */
    bannerMobileExtraHdImageUrl?: string
    /** Banner image. Mobile size high resolution (1280x360). */
    bannerMobileHdImageUrl?: string
    /** Banner image. Mobile size (640x175). */
    bannerMobileImageUrl?: string
    /** Banner image. Mobile size low resolution (320x88). */
    bannerMobileLowImageUrl?: string
    /** Banner image. Mobile size medium/high resolution (960x263). */
    bannerMobileMediumHdImageUrl?: string
    /** Banner image. Tablet size extra high resolution (2560x424). */
    bannerTabletExtraHdImageUrl?: string
    /** Banner image. Tablet size high resolution (2276x377). */
    bannerTabletHdImageUrl?: string
    /** Banner image. Tablet size (1707x283). */
    bannerTabletImageUrl?: string
    /** Banner image. Tablet size low resolution (1138x188). */
    bannerTabletLowImageUrl?: string
    /** Banner image. TV size high resolution (1920x1080). */
    bannerTvHighImageUrl?: string
    /** Banner image. TV size extra high resolution (2120x1192). */
    bannerTvImageUrl?: string
    /** Banner image. TV size low resolution (854x480). */
    bannerTvLowImageUrl?: string
    /** Banner image. TV size medium resolution (1280x720). */
    bannerTvMediumImageUrl?: string
    /** The image map script for the large banner image. */
    largeBrandedBannerImageImapScript?: LocalizedProperty
    /** The URL for the 854px by 70px image that appears below the video player in the expanded video view of the video watch page. */
    largeBrandedBannerImageUrl?: LocalizedProperty
    /** The image map script for the small banner image. */
    smallBrandedBannerImageImapScript?: LocalizedProperty
    /**
     * The URL for the 640px by 70px banner image that appears below the video player in the default view of the video watch page. The URL for the image that appears above the top-left
     * corner of the video player. This is a 25-pixel-high image with a flexible width that cannot exceed 170 pixels.
     */
    smallBrandedBannerImageUrl?: LocalizedProperty
    /** The URL for a 1px by 1px tracking pixel that can be used to collect statistics for views of the channel or video pages. */
    trackingImageUrl?: string
    watchIconImageUrl?: string
  }
  interface IngestionInfo {
    /**
     * The backup ingestion URL that you should use to stream video to YouTube. You have the option of simultaneously streaming the content that you are sending to the ingestionAddress to
     * this URL.
     */
    backupIngestionAddress?: string
    /**
     * The primary ingestion URL that you should use to stream video to YouTube. You must stream video to this URL. Depending on which application or tool you use to encode your video
     * stream, you may need to enter the stream URL and stream name separately or you may need to concatenate them in the following format: *STREAM_URL/STREAM_NAME*
     */
    ingestionAddress?: string
    /** This ingestion url may be used instead of backupIngestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams. */
    rtmpsBackupIngestionAddress?: string
    /** This ingestion url may be used instead of ingestionAddress in order to stream via RTMPS. Not applicable to non-RTMP streams. */
    rtmpsIngestionAddress?: string
    /** The stream name that YouTube assigns to the video stream. */
    streamName?: string
  }
  interface InvideoBranding {
    /** The bytes the uploaded image. Only used in api to youtube communication. */
    imageBytes?: string
    /** The url of the uploaded image. Only used in apiary to api communication. */
    imageUrl?: string
    /** The spatial position within the video where the branding watermark will be displayed. */
    position?: InvideoPosition
    /** The channel to which this branding links. If not present it defaults to the current channel. */
    targetChannelId?: string
    /** The temporal position within the video where watermark will be displayed. */
    timing?: InvideoTiming
  }
  interface InvideoPosition {
    /** Describes in which corner of the video the visual widget will appear. */
    cornerPosition?: string
    /** Defines the position type. */
    type?: string
  }
  interface InvideoTiming {
    /** Defines the duration in milliseconds for which the promotion should be displayed. If missing, the client should use the default. */
    durationMs?: string
    /**
     * Defines the time at which the promotion will appear. Depending on the value of type the value of the offsetMs field will represent a time offset from the start or from the end of
     * the video, expressed in milliseconds.
     */
    offsetMs?: string
    /**
     * Describes a timing type. If the value is offsetFromStart, then the offsetMs field represents an offset from the start of the video. If the value is offsetFromEnd, then the offsetMs
     * field represents an offset from the end of the video.
     */
    type?: string
  }
  interface LanguageTag {
    value?: string
  }
  interface LevelDetails {
    /** The name that should be used when referring to this level. */
    displayName?: string
  }
  interface LiveBroadcast {
    /**
     * The contentDetails object contains information about the event's video content, such as whether the content can be shown in an embedded video player or if it will be archived and
     * therefore available for viewing after the event has concluded.
     */
    contentDetails?: LiveBroadcastContentDetails
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube assigns to uniquely identify the broadcast. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcast". */
    kind?: string
    /** The snippet object contains basic details about the event, including its title, description, start time, and end time. */
    snippet?: LiveBroadcastSnippet
    /**
     * The statistics object contains info about the event's current stats. These include concurrent viewers and total chat count. Statistics can change (in either direction) during the
     * lifetime of an event. Statistics are only returned while the event is live.
     */
    statistics?: LiveBroadcastStatistics
    /** The status object contains information about the event's status. */
    status?: LiveBroadcastStatus
  }
  interface LiveBroadcastContentDetails {
    /** This value uniquely identifies the live stream bound to the broadcast. */
    boundStreamId?: string
    /** The date and time that the live stream referenced by boundStreamId was last updated. */
    boundStreamLastUpdateTimeMs?: string
    closedCaptionsType?: string
    /** This setting indicates whether auto start is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events. */
    enableAutoStart?: boolean
    /** This setting indicates whether auto stop is enabled for this broadcast. The default value for this property is false. This setting can only be used by Events. */
    enableAutoStop?: boolean
    /**
     * This setting indicates whether HTTP POST closed captioning is enabled for this broadcast. The ingestion URL of the closed captions is returned through the liveStreams API. This is
     * mutually exclusive with using the closed_captions_type property, and is equivalent to setting closed_captions_type to CLOSED_CAPTIONS_HTTP_POST.
     */
    enableClosedCaptions?: boolean
    /** This setting indicates whether YouTube should enable content encryption for the broadcast. */
    enableContentEncryption?: boolean
    /**
     * This setting determines whether viewers can access DVR controls while watching the video. DVR controls enable the viewer to control the video playback experience by pausing,
     * rewinding, or fast forwarding content. The default value for this property is true. *Important:* You must set the value to true and also set the enableArchive property's value to
     * true if you want to make playback available immediately after the broadcast ends.
     */
    enableDvr?: boolean
    /**
     * This setting indicates whether the broadcast video can be played in an embedded player. If you choose to archive the video (using the enableArchive property), this setting will also
     * apply to the archived video.
     */
    enableEmbed?: boolean
    /** Indicates whether this broadcast has low latency enabled. */
    enableLowLatency?: boolean
    /**
     * If both this and enable_low_latency are set, they must match. LATENCY_NORMAL should match enable_low_latency=false LATENCY_LOW should match enable_low_latency=true LATENCY_ULTRA_LOW
     * should have enable_low_latency omitted.
     */
    latencyPreference?: string
    /**
     * The mesh for projecting the video if projection is mesh. The mesh value must be a UTF-8 string containing the base-64 encoding of 3D mesh data that follows the Spherical Video V2
     * RFC specification for an mshp box, excluding the box size and type but including the following four reserved zero bytes for the version and flags.
     */
    mesh?: string
    /** The monitorStream object contains information about the monitor stream, which the broadcaster can use to review the event content before the broadcast stream is shown publicly. */
    monitorStream?: MonitorStreamInfo
    /** The projection format of this broadcast. This defaults to rectangular. */
    projection?: string
    /**
     * Automatically start recording after the event goes live. The default value for this property is true. *Important:* You must also set the enableDvr property's value to true if you
     * want the playback to be available immediately after the broadcast ends. If you set this property's value to true but do not also set the enableDvr property to true, there may be a
     * delay of around one day before the archived video will be available for playback.
     */
    recordFromStart?: boolean
    /**
     * This setting indicates whether the broadcast should automatically begin with an in-stream slate when you update the broadcast's status to live. After updating the status, you then
     * need to send a liveCuepoints.insert request that sets the cuepoint's eventState to end to remove the in-stream slate and make your broadcast stream visible to viewers.
     */
    startWithSlate?: boolean
    /** The 3D stereo layout of this broadcast. This defaults to mono. */
    stereoLayout?: string
  }
  interface LiveBroadcastListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of broadcasts that match the request criteria. */
    items?: LiveBroadcast[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveBroadcastListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface LiveBroadcastSnippet {
    /** The date and time that the broadcast actually ended. This information is only available once the broadcast's state is complete. */
    actualEndTime?: string
    /** The date and time that the broadcast actually started. This information is only available once the broadcast's state is live. */
    actualStartTime?: string
    /** The ID that YouTube uses to uniquely identify the channel that is publishing the broadcast. */
    channelId?: string
    /** The broadcast's description. As with the title, you can set this field by modifying the broadcast resource or by setting the description field of the corresponding video resource. */
    description?: string
    /** Indicates whether this broadcast is the default broadcast. Internal only. */
    isDefaultBroadcast?: boolean
    /** The id of the live chat for this broadcast. */
    liveChatId?: string
    /** The date and time that the broadcast was added to YouTube's live broadcast schedule. */
    publishedAt?: string
    /** The date and time that the broadcast is scheduled to end. */
    scheduledEndTime?: string
    /** The date and time that the broadcast is scheduled to start. */
    scheduledStartTime?: string
    /**
     * A map of thumbnail images associated with the broadcast. For each nested object in this object, the key is the name of the thumbnail image, and the value is an object that contains
     * other information about the thumbnail.
     */
    thumbnails?: ThumbnailDetails
    /**
     * The broadcast's title. Note that the broadcast represents exactly one YouTube video. You can set this field by modifying the broadcast resource or by setting the title field of the
     * corresponding video resource.
     */
    title?: string
  }
  interface LiveBroadcastStatistics {
    /**
     * The total number of live chat messages currently on the broadcast. The property and its value will be present if the broadcast is public, has the live chat feature enabled, and has
     * at least one message. Note that this field will not be filled after the broadcast ends. So this property would not identify the number of chat messages for an archived video of a
     * completed live broadcast.
     */
    totalChatCount?: string
  }
  interface LiveBroadcastStatus {
    /** The broadcast's status. The status can be updated using the API's liveBroadcasts.transition method. */
    lifeCycleStatus?: string
    /** Priority of the live broadcast event (internal state). */
    liveBroadcastPriority?: string
    /** Whether the broadcast is made for kids or not, decided by YouTube instead of the creator. This field is read only. */
    madeForKids?: boolean
    /**
     * The broadcast's privacy status. Note that the broadcast represents exactly one YouTube video, so the privacy settings are identical to those supported for videos. In addition, you
     * can set this field by modifying the broadcast resource or by setting the privacyStatus field of the corresponding video resource.
     */
    privacyStatus?: string
    /** The broadcast's recording status. */
    recordingStatus?: string
    /** This field will be set to True if the creator declares the broadcast to be kids only: go/live-cw-work. */
    selfDeclaredMadeForKids?: boolean
  }
  interface LiveChatBan {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube assigns to uniquely identify the ban. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string `"youtube#liveChatBan"`. */
    kind?: string
    /** The `snippet` object contains basic details about the ban. */
    snippet?: LiveChatBanSnippet
  }
  interface LiveChatBanSnippet {
    /** The duration of a ban, only filled if the ban has type TEMPORARY. */
    banDurationSeconds?: string
    bannedUserDetails?: ChannelProfileDetails
    /** The chat this ban is pertinent to. */
    liveChatId?: string
    /** The type of ban. */
    type?: string
  }
  interface LiveChatFanFundingEventDetails {
    /** A rendered string that displays the fund amount and currency to the user. */
    amountDisplayString?: string
    /** The amount of the fund. */
    amountMicros?: string
    /** The currency in which the fund was made. */
    currency?: string
    /** The comment added by the user to this fan funding event. */
    userComment?: string
  }
  interface LiveChatGiftMembershipReceivedDetails {
    /** The ID of the membership gifting message that is related to this gift membership. This ID will always refer to a message whose type is 'membershipGiftingEvent'. */
    associatedMembershipGiftingMessageId?: string
    /** The ID of the user that made the membership gifting purchase. This matches the `snippet.authorChannelId` of the associated membership gifting message. */
    gifterChannelId?: string
    /**
     * The name of the Level at which the viewer is a member. This matches the `snippet.membershipGiftingDetails.giftMembershipsLevelName` of the associated membership gifting message. The
     * Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled.
     */
    memberLevelName?: string
  }
  interface LiveChatMemberMilestoneChatDetails {
    /** The name of the Level at which the viever is a member. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
    memberLevelName?: string
    /**
     * The total amount of months (rounded up) the viewer has been a member that granted them this Member Milestone Chat. This is the same number of months as is being displayed to YouTube
     * users.
     */
    memberMonth?: number
    /** The comment added by the member to this Member Milestone Chat. This field is empty for messages without a comment from the member. */
    userComment?: string
  }
  interface LiveChatMembershipGiftingDetails {
    /** The number of gift memberships purchased by the user. */
    giftMembershipsCount?: number
    /**
     * The name of the level of the gift memberships purchased by the user. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't
     * filled.
     */
    giftMembershipsLevelName?: string
  }
  interface LiveChatMessage {
    /** The authorDetails object contains basic details about the user that posted this message. */
    authorDetails?: LiveChatMessageAuthorDetails
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube assigns to uniquely identify the message. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessage". */
    kind?: string
    /** The snippet object contains basic details about the message. */
    snippet?: LiveChatMessageSnippet
  }
  interface LiveChatMessageAuthorDetails {
    /** The YouTube channel ID. */
    channelId?: string
    /** The channel's URL. */
    channelUrl?: string
    /** The channel's display name. */
    displayName?: string
    /** Whether the author is a moderator of the live chat. */
    isChatModerator?: boolean
    /** Whether the author is the owner of the live chat. */
    isChatOwner?: boolean
    /** Whether the author is a sponsor of the live chat. */
    isChatSponsor?: boolean
    /** Whether the author's identity has been verified by YouTube. */
    isVerified?: boolean
    /** The channels's avatar URL. */
    profileImageUrl?: string
  }
  interface LiveChatMessageDeletedDetails {
    deletedMessageId?: string
  }
  interface LiveChatMessageListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    items?: LiveChatMessage[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatMessageListResponse". */
    kind?: string
    nextPageToken?: string
    /** The date and time when the underlying stream went offline. */
    offlineAt?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The amount of time the client should wait before polling again. */
    pollingIntervalMillis?: number
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface LiveChatMessageRetractedDetails {
    retractedMessageId?: string
  }
  interface LiveChatMessageSnippet {
    /**
     * The ID of the user that authored this message, this field is not always filled. textMessageEvent - the user that wrote the message fanFundingEvent - the user that funded the
     * broadcast newSponsorEvent - the user that just became a sponsor memberMilestoneChatEvent - the member that sent the message membershipGiftingEvent - the user that made the purchase
     * giftMembershipReceivedEvent - the user that received the gift membership messageDeletedEvent - the moderator that took the action messageRetractedEvent - the author that retracted
     * their message userBannedEvent - the moderator that took the action superChatEvent - the user that made the purchase superStickerEvent - the user that made the purchase
     */
    authorChannelId?: string
    /**
     * Contains a string that can be displayed to the user. If this field is not present the message is silent, at the moment only messages of type TOMBSTONE and CHAT_ENDED_EVENT are
     * silent.
     */
    displayMessage?: string
    /** Details about the funding event, this is only set if the type is 'fanFundingEvent'. */
    fanFundingEventDetails?: LiveChatFanFundingEventDetails
    /** Details about the Gift Membership Received event, this is only set if the type is 'giftMembershipReceivedEvent'. */
    giftMembershipReceivedDetails?: LiveChatGiftMembershipReceivedDetails
    /** Whether the message has display content that should be displayed to users. */
    hasDisplayContent?: boolean
    liveChatId?: string
    /** Details about the Member Milestone Chat event, this is only set if the type is 'memberMilestoneChatEvent'. */
    memberMilestoneChatDetails?: LiveChatMemberMilestoneChatDetails
    /** Details about the Membership Gifting event, this is only set if the type is 'membershipGiftingEvent'. */
    membershipGiftingDetails?: LiveChatMembershipGiftingDetails
    messageDeletedDetails?: LiveChatMessageDeletedDetails
    messageRetractedDetails?: LiveChatMessageRetractedDetails
    /** Details about the New Member Announcement event, this is only set if the type is 'newSponsorEvent'. Please note that "member" is the new term for "sponsor". */
    newSponsorDetails?: LiveChatNewSponsorDetails
    /** The date and time when the message was orignally published. */
    publishedAt?: string
    /** Details about the Super Chat event, this is only set if the type is 'superChatEvent'. */
    superChatDetails?: LiveChatSuperChatDetails
    /** Details about the Super Sticker event, this is only set if the type is 'superStickerEvent'. */
    superStickerDetails?: LiveChatSuperStickerDetails
    /** Details about the text message, this is only set if the type is 'textMessageEvent'. */
    textMessageDetails?: LiveChatTextMessageDetails
    /** The type of message, this will always be present, it determines the contents of the message as well as which fields will be present. */
    type?: string
    userBannedDetails?: LiveChatUserBannedMessageDetails
  }
  interface LiveChatModerator {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube assigns to uniquely identify the moderator. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModerator". */
    kind?: string
    /** The snippet object contains basic details about the moderator. */
    snippet?: LiveChatModeratorSnippet
  }
  interface LiveChatModeratorListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of moderators that match the request criteria. */
    items?: LiveChatModerator[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveChatModeratorListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface LiveChatModeratorSnippet {
    /** The ID of the live chat this moderator can act on. */
    liveChatId?: string
    /** Details about the moderator. */
    moderatorDetails?: ChannelProfileDetails
  }
  interface LiveChatNewSponsorDetails {
    /** If the viewer just had upgraded from a lower level. For viewers that were not members at the time of purchase, this field is false. */
    isUpgrade?: boolean
    /** The name of the Level that the viewer just had joined. The Level names are defined by the YouTube channel offering the Membership. In some situations this field isn't filled. */
    memberLevelName?: string
  }
  interface LiveChatSuperChatDetails {
    /** A rendered string that displays the fund amount and currency to the user. */
    amountDisplayString?: string
    /** The amount purchased by the user, in micros (1,750,000 micros = 1.75). */
    amountMicros?: string
    /** The currency in which the purchase was made. */
    currency?: string
    /** The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1. */
    tier?: number
    /** The comment added by the user to this Super Chat event. */
    userComment?: string
  }
  interface LiveChatSuperStickerDetails {
    /** A rendered string that displays the fund amount and currency to the user. */
    amountDisplayString?: string
    /** The amount purchased by the user, in micros (1,750,000 micros = 1.75). */
    amountMicros?: string
    /** The currency in which the purchase was made. */
    currency?: string
    /** Information about the Super Sticker. */
    superStickerMetadata?: SuperStickerMetadata
    /** The tier in which the amount belongs. Lower amounts belong to lower tiers. The lowest tier is 1. */
    tier?: number
  }
  interface LiveChatTextMessageDetails {
    /** The user's message. */
    messageText?: string
  }
  interface LiveChatUserBannedMessageDetails {
    /** The duration of the ban. This property is only present if the banType is temporary. */
    banDurationSeconds?: string
    /** The details of the user that was banned. */
    bannedUserDetails?: ChannelProfileDetails
    /** The type of ban. */
    banType?: string
  }
  interface LiveStream {
    /** The cdn object defines the live stream's content delivery network (CDN) settings. These settings provide details about the manner in which you stream your content to YouTube. */
    cdn?: CdnSettings
    /** The content_details object contains information about the stream, including the closed captions ingestion URL. */
    contentDetails?: LiveStreamContentDetails
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube assigns to uniquely identify the stream. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveStream". */
    kind?: string
    /** The snippet object contains basic details about the stream, including its channel, title, and description. */
    snippet?: LiveStreamSnippet
    /** The status object contains information about live stream's status. */
    status?: LiveStreamStatus
  }
  interface LiveStreamConfigurationIssue {
    /** The long-form description of the issue and how to resolve it. */
    description?: string
    /** The short-form reason for this issue. */
    reason?: string
    /** How severe this issue is to the stream. */
    severity?: string
    /** The kind of error happening. */
    type?: string
  }
  interface LiveStreamContentDetails {
    /** The ingestion URL where the closed captions of this stream are sent. */
    closedCaptionsIngestionUrl?: string
    /**
     * Indicates whether the stream is reusable, which means that it can be bound to multiple broadcasts. It is common for broadcasters to reuse the same stream for many different
     * broadcasts if those broadcasts occur at different times. If you set this value to false, then the stream will not be reusable, which means that it can only be bound to one
     * broadcast. Non-reusable streams differ from reusable streams in the following ways: - A non-reusable stream can only be bound to one broadcast. - A non-reusable stream might be
     * deleted by an automated process after the broadcast ends. - The liveStreams.list method does not list non-reusable streams if you call the method and set the mine parameter to true.
     * The only way to use that method to retrieve the resource for a non-reusable stream is to use the id parameter to identify the stream.
     */
    isReusable?: boolean
  }
  interface LiveStreamHealthStatus {
    /** The configurations issues on this stream */
    configurationIssues?: LiveStreamConfigurationIssue[]
    /** The last time this status was updated (in seconds) */
    lastUpdateTimeSeconds?: string
    /** The status code of this stream */
    status?: string
  }
  interface LiveStreamListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of live streams that match the request criteria. */
    items?: LiveStream[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#liveStreamListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface LiveStreamSnippet {
    /** The ID that YouTube uses to uniquely identify the channel that is transmitting the stream. */
    channelId?: string
    /** The stream's description. The value cannot be longer than 10000 characters. */
    description?: string
    isDefaultStream?: boolean
    /** The date and time that the stream was created. */
    publishedAt?: string
    /** The stream's title. The value must be between 1 and 128 characters long. */
    title?: string
  }
  interface LiveStreamStatus {
    /** The health status of the stream. */
    healthStatus?: LiveStreamHealthStatus
    streamStatus?: string
  }
  interface LocalizedProperty {
    default?: string
    /** The language of the default property. */
    defaultLanguage?: LanguageTag
    localized?: LocalizedString[]
  }
  interface LocalizedString {
    language?: string
    value?: string
  }
  interface Member {
    /** Etag of this resource. */
    etag?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#member". */
    kind?: string
    /** The snippet object contains basic details about the member. */
    snippet?: MemberSnippet
  }
  interface MemberListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of members that match the request criteria. */
    items?: Member[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#memberListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    pageInfo?: PageInfo
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface MembershipsDetails {
    /** Ids of all levels that the user has access to. This includes the currently active level and all other levels that are included because of a higher purchase. */
    accessibleLevels?: string[]
    /** Id of the highest level that the user has access to at the moment. */
    highestAccessibleLevel?: string
    /** Display name for the highest level that the user has access to at the moment. */
    highestAccessibleLevelDisplayName?: string
    /** Data about memberships duration without taking into consideration pricing levels. */
    membershipsDuration?: MembershipsDuration
    /** Data about memberships duration on particular pricing levels. */
    membershipsDurationAtLevels?: MembershipsDurationAtLevel[]
  }
  interface MembershipsDuration {
    /** The date and time when the user became a continuous member across all levels. */
    memberSince?: string
    /** The cumulative time the user has been a member across all levels in complete months (the time is rounded down to the nearest integer). */
    memberTotalDurationMonths?: number
  }
  interface MembershipsDurationAtLevel {
    /** Pricing level ID. */
    level?: string
    /** The date and time when the user became a continuous member for the given level. */
    memberSince?: string
    /** The cumulative time the user has been a member for the given level in complete months (the time is rounded down to the nearest integer). */
    memberTotalDurationMonths?: number
  }
  interface MembershipsLevel {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube assigns to uniquely identify the memberships level. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#membershipsLevelListResponse". */
    kind?: string
    /** The snippet object contains basic details about the level. */
    snippet?: MembershipsLevelSnippet
  }
  interface MembershipsLevelListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of pricing levels offered by a creator to the fans. */
    items?: MembershipsLevel[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#membershipsLevelListResponse". */
    kind?: string
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface MembershipsLevelSnippet {
    /** The id of the channel that's offering channel memberships. */
    creatorChannelId?: string
    /** Details about the pricing level. */
    levelDetails?: LevelDetails
  }
  interface MemberSnippet {
    /** The id of the channel that's offering memberships. */
    creatorChannelId?: string
    /** Details about the member. */
    memberDetails?: ChannelProfileDetails
    /** Details about the user's membership. */
    membershipsDetails?: MembershipsDetails
  }
  interface MonitorStreamInfo {
    /** If you have set the enableMonitorStream property to true, then this property determines the length of the live broadcast delay. */
    broadcastStreamDelayMs?: number
    /** HTML code that embeds a player that plays the monitor stream. */
    embedHtml?: string
    /**
     * This value determines whether the monitor stream is enabled for the broadcast. If the monitor stream is enabled, then YouTube will broadcast the event content on a special stream
     * intended only for the broadcaster's consumption. The broadcaster can use the stream to review the event content and also to identify the optimal times to insert cuepoints. You need
     * to set this value to true if you intend to have a broadcast delay for your event. *Note:* This property cannot be updated once the broadcast is in the testing or live state.
     */
    enableMonitorStream?: boolean
  }
  interface PageInfo {
    /** The number of results included in the API response. */
    resultsPerPage?: number
    /** The total number of results in the result set. */
    totalResults?: number
  }
  interface Playlist {
    /** The contentDetails object contains information like video count. */
    contentDetails?: PlaylistContentDetails
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the playlist. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlist". */
    kind?: string
    /** Localizations for different languages */
    localizations?: { [P in string]: PlaylistLocalization }
    /** The player object contains information that you would use to play the playlist in an embedded player. */
    player?: PlaylistPlayer
    /** The snippet object contains basic details about the playlist, such as its title and description. */
    snippet?: PlaylistSnippet
    /** The status object contains status information for the playlist. */
    status?: PlaylistStatus
  }
  interface PlaylistContentDetails {
    /** The number of videos in the playlist. */
    itemCount?: number
  }
  interface PlaylistItem {
    /** The contentDetails object is included in the resource if the included item is a YouTube video. The object contains additional information about the video. */
    contentDetails?: PlaylistItemContentDetails
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the playlist item. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItem". */
    kind?: string
    /** The snippet object contains basic details about the playlist item, such as its title and position in the playlist. */
    snippet?: PlaylistItemSnippet
    /** The status object contains information about the playlist item's privacy status. */
    status?: PlaylistItemStatus
  }
  interface PlaylistItemContentDetails {
    /**
     * The time, measured in seconds from the start of the video, when the video should stop playing. (The playlist owner can specify the times when the video should start and stop playing
     * when the video is played in the context of the playlist.) By default, assume that the video.endTime is the end of the video.
     */
    endAt?: string
    /** A user-generated note for this item. */
    note?: string
    /**
     * The time, measured in seconds from the start of the video, when the video should start playing. (The playlist owner can specify the times when the video should start and stop
     * playing when the video is played in the context of the playlist.) The default value is 0.
     */
    startAt?: string
    /** The ID that YouTube uses to uniquely identify a video. To retrieve the video resource, set the id query parameter to this value in your API request. */
    videoId?: string
    /** The date and time that the video was published to YouTube. */
    videoPublishedAt?: string
  }
  interface PlaylistItemListResponse {
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of playlist items that match the request criteria. */
    items?: PlaylistItem[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistItemListResponse". Etag of this resource. */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface PlaylistItemSnippet {
    /** The ID that YouTube uses to uniquely identify the user that added the item to the playlist. */
    channelId?: string
    /** Channel title for the channel that the playlist item belongs to. */
    channelTitle?: string
    /** The item's description. */
    description?: string
    /** The ID that YouTube uses to uniquely identify thGe playlist that the playlist item is in. */
    playlistId?: string
    /** The order in which the item appears in the playlist. The value uses a zero-based index, so the first item has a position of 0, the second item has a position of 1, and so forth. */
    position?: number
    /** The date and time that the item was added to the playlist. */
    publishedAt?: string
    /** The id object contains information that can be used to uniquely identify the resource that is included in the playlist as the playlist item. */
    resourceId?: ResourceId
    /**
     * A map of thumbnail images associated with the playlist item. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
     * information about the thumbnail.
     */
    thumbnails?: ThumbnailDetails
    /** The item's title. */
    title?: string
    /** Channel id for the channel this video belongs to. */
    videoOwnerChannelId?: string
    /** Channel title for the channel this video belongs to. */
    videoOwnerChannelTitle?: string
  }
  interface PlaylistItemStatus {
    /** This resource's privacy status. */
    privacyStatus?: string
  }
  interface PlaylistListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of playlists that match the request criteria */
    items?: Playlist[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#playlistListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface PlaylistLocalization {
    /** The localized strings for playlist's description. */
    description?: string
    /** The localized strings for playlist's title. */
    title?: string
  }
  interface PlaylistPlayer {
    /** An <iframe> tag that embeds a player that will play the playlist. */
    embedHtml?: string
  }
  interface PlaylistSnippet {
    /** The ID that YouTube uses to uniquely identify the channel that published the playlist. */
    channelId?: string
    /** The channel title of the channel that the video belongs to. */
    channelTitle?: string
    /** The language of the playlist's default title and description. */
    defaultLanguage?: string
    /** The playlist's description. */
    description?: string
    /** Localized title and description, read-only. */
    localized?: PlaylistLocalization
    /** The date and time that the playlist was created. */
    publishedAt?: string
    /** Keyword tags associated with the playlist. */
    tags?: string[]
    /**
     * A map of thumbnail images associated with the playlist. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
     * information about the thumbnail.
     */
    thumbnails?: ThumbnailDetails
    /**
     * Note: if the playlist has a custom thumbnail, this field will not be populated. The video id selected by the user that will be used as the thumbnail of this playlist. This field
     * defaults to the first publicly viewable video in the playlist, if: 1. The user has never selected a video to be the thumbnail of the playlist. 2. The user selects a video to be the
     * thumbnail, and then removes that video from the playlist. 3. The user selects a non-owned video to be the thumbnail, but that video becomes private, or gets deleted.
     */
    thumbnailVideoId?: string
    /** The playlist's title. */
    title?: string
  }
  interface PlaylistStatus {
    /** The playlist's privacy status. */
    privacyStatus?: string
  }
  interface PropertyValue {
    /** A property. */
    property?: string
    /** The property's value. */
    value?: string
  }
  interface RelatedEntity {
    entity?: Entity
  }
  interface ResourceId {
    /** The ID that YouTube uses to uniquely identify the referred resource, if that resource is a channel. This property is only present if the resourceId.kind value is youtube#channel. */
    channelId?: string
    /** The type of the API resource. */
    kind?: string
    /** The ID that YouTube uses to uniquely identify the referred resource, if that resource is a playlist. This property is only present if the resourceId.kind value is youtube#playlist. */
    playlistId?: string
    /** The ID that YouTube uses to uniquely identify the referred resource, if that resource is a video. This property is only present if the resourceId.kind value is youtube#video. */
    videoId?: string
  }
  interface SearchListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** Pagination information for token pagination. */
    items?: SearchResult[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#searchListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    regionCode?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface SearchResult {
    /** Etag of this resource. */
    etag?: string
    /** The id object contains information that can be used to uniquely identify the resource that matches the search request. */
    id?: ResourceId
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#searchResult". */
    kind?: string
    /**
     * The snippet object contains basic details about a search result, such as its title or description. For example, if the search result is a video, then the title will be the video's
     * title and the description will be the video's description.
     */
    snippet?: SearchResultSnippet
  }
  interface SearchResultSnippet {
    /** The value that YouTube uses to uniquely identify the channel that published the resource that the search result identifies. */
    channelId?: string
    /** The title of the channel that published the resource that the search result identifies. */
    channelTitle?: string
    /** A description of the search result. */
    description?: string
    /** It indicates if the resource (video or channel) has upcoming/active live broadcast content. Or it's "none" if there is not any upcoming/active live broadcasts. */
    liveBroadcastContent?: string
    /** The creation date and time of the resource that the search result identifies. */
    publishedAt?: string
    /**
     * A map of thumbnail images associated with the search result. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
     * information about the thumbnail.
     */
    thumbnails?: ThumbnailDetails
    /** The title of the search result. */
    title?: string
  }
  interface Subscription {
    /** The contentDetails object contains basic statistics about the subscription. */
    contentDetails?: SubscriptionContentDetails
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the subscription. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#subscription". */
    kind?: string
    /** The snippet object contains basic details about the subscription, including its title and the channel that the user subscribed to. */
    snippet?: SubscriptionSnippet
    /** The subscriberSnippet object contains basic details about the subscriber. */
    subscriberSnippet?: SubscriptionSubscriberSnippet
  }
  interface SubscriptionContentDetails {
    /** The type of activity this subscription is for (only uploads, everything). */
    activityType?: string
    /** The number of new items in the subscription since its content was last read. */
    newItemCount?: number
    /** The approximate number of items that the subscription points to. */
    totalItemCount?: number
  }
  interface SubscriptionListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of subscriptions that match the request criteria. */
    items?: Subscription[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#subscriptionListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface SubscriptionSnippet {
    /** The ID that YouTube uses to uniquely identify the subscriber's channel. */
    channelId?: string
    /** Channel title for the channel that the subscription belongs to. */
    channelTitle?: string
    /** The subscription's details. */
    description?: string
    /** The date and time that the subscription was created. */
    publishedAt?: string
    /** The id object contains information about the channel that the user subscribed to. */
    resourceId?: ResourceId
    /**
     * A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
     * information about the thumbnail.
     */
    thumbnails?: ThumbnailDetails
    /** The subscription's title. */
    title?: string
  }
  interface SubscriptionSubscriberSnippet {
    /** The channel ID of the subscriber. */
    channelId?: string
    /** The description of the subscriber. */
    description?: string
    /** Thumbnails for this subscriber. */
    thumbnails?: ThumbnailDetails
    /** The title of the subscriber. */
    title?: string
  }
  interface SuperChatEvent {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube assigns to uniquely identify the Super Chat event. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string `"youtube#superChatEvent"`. */
    kind?: string
    /** The `snippet` object contains basic details about the Super Chat event. */
    snippet?: SuperChatEventSnippet
  }
  interface SuperChatEventListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of Super Chat purchases that match the request criteria. */
    items?: SuperChatEvent[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#superChatEventListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    pageInfo?: PageInfo
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface SuperChatEventSnippet {
    /** The purchase amount, in micros of the purchase currency. e.g., 1 is represented as 1000000. */
    amountMicros?: string
    /** Channel id where the event occurred. */
    channelId?: string
    /** The text contents of the comment left by the user. */
    commentText?: string
    /** The date and time when the event occurred. */
    createdAt?: string
    /** The currency in which the purchase was made. ISO 4217. */
    currency?: string
    /** A rendered string that displays the purchase amount and currency (e.g., "$1.00"). The string is rendered for the given language. */
    displayString?: string
    /** True if this event is a Super Sticker event. */
    isSuperStickerEvent?: boolean
    /** The tier for the paid message, which is based on the amount of money spent to purchase the message. */
    messageType?: number
    /** If this event is a Super Sticker event, this field will contain metadata about the Super Sticker. */
    superStickerMetadata?: SuperStickerMetadata
    /** Details about the supporter. */
    supporterDetails?: ChannelProfileDetails
  }
  interface SuperStickerMetadata {
    /** Internationalized alt text that describes the sticker image and any animation associated with it. */
    altText?: string
    /** Specifies the localization language in which the alt text is returned. */
    altTextLanguage?: string
    /** Unique identifier of the Super Sticker. This is a shorter form of the alt_text that includes pack name and a recognizable characteristic of the sticker. */
    stickerId?: string
  }
  interface TestItem {
    featuredPart?: boolean
    gaia?: string
    id?: string
    snippet?: any
  }
  interface ThirdPartyLink {
    /** Etag of this resource */
    etag?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#thirdPartyLink". */
    kind?: string
    /** The linking_token identifies a YouTube account and channel with which the third party account is linked. */
    linkingToken?: string
    /** The snippet object contains basic details about the third- party account link. */
    snippet?: ThirdPartyLinkSnippet
    /** The status object contains information about the status of the link. */
    status?: ThirdPartyLinkStatus
  }
  interface ThirdPartyLinkSnippet {
    /** Information specific to a link between a channel and a store on a merchandising platform. */
    channelToStoreLink?: ChannelToStoreLinkDetails
    /** Type of the link named after the entities that are being linked. */
    type?: string
  }
  interface ThirdPartyLinkStatus {
    linkStatus?: string
  }
  interface Thumbnail {
    /** (Optional) Height of the thumbnail image. */
    height?: number
    /** The thumbnail image's URL. */
    url?: string
    /** (Optional) Width of the thumbnail image. */
    width?: number
  }
  interface ThumbnailDetails {
    /** The default image for this resource. */
    default?: Thumbnail
    /** The high quality image for this resource. */
    high?: Thumbnail
    /** The maximum resolution quality image for this resource. */
    maxres?: Thumbnail
    /** The medium quality image for this resource. */
    medium?: Thumbnail
    /** The standard quality image for this resource. */
    standard?: Thumbnail
  }
  interface ThumbnailSetResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of thumbnails. */
    items?: ThumbnailDetails[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#thumbnailSetResponse". */
    kind?: string
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface Video {
    /** Age restriction details related to a video. This data can only be retrieved by the video owner. */
    ageGating?: VideoAgeGating
    /** The contentDetails object contains information about the video content, including the length of the video and its aspect ratio. */
    contentDetails?: VideoContentDetails
    /** Etag of this resource. */
    etag?: string
    /**
     * The fileDetails object encapsulates information about the video file that was uploaded to YouTube, including the file's resolution, duration, audio and video codecs, stream
     * bitrates, and more. This data can only be retrieved by the video owner.
     */
    fileDetails?: VideoFileDetails
    /** The ID that YouTube uses to uniquely identify the video. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#video". */
    kind?: string
    /**
     * The liveStreamingDetails object contains metadata about a live video broadcast. The object will only be present in a video resource if the video is an upcoming, live, or completed
     * live broadcast.
     */
    liveStreamingDetails?: VideoLiveStreamingDetails
    /** The localizations object contains localized versions of the basic details about the video, such as its title and description. */
    localizations?: { [P in string]: VideoLocalization }
    /** The monetizationDetails object encapsulates information about the monetization status of the video. */
    monetizationDetails?: VideoMonetizationDetails
    /** The player object contains information that you would use to play the video in an embedded player. */
    player?: VideoPlayer
    /**
     * The processingDetails object encapsulates information about YouTube's progress in processing the uploaded video file. The properties in the object identify the current processing
     * status and an estimate of the time remaining until YouTube finishes processing the video. This part also indicates whether different types of data or content, such as file details
     * or thumbnail images, are available for the video. The processingProgress object is designed to be polled so that the video uploaded can track the progress that YouTube has made in
     * processing the uploaded video file. This data can only be retrieved by the video owner.
     */
    processingDetails?: VideoProcessingDetails
    /**
     * The projectDetails object contains information about the project specific video metadata. b/157517979: This part was never populated after it was added. However, it sees non-zero
     * traffic because there is generated client code in the wild that refers to it [1]. We keep this field and do NOT remove it because otherwise V3 would return an error when this part
     * gets requested [2]. [1]
     * https://developers.google.com/resources/api-libraries/documentation/youtube/v3/csharp/latest/classGoogle_1_1Apis_1_1YouTube_1_1v3_1_1Data_1_1VideoProjectDetails.html [2]
     * http://google3/video/youtube/src/python/servers/data_api/common.py?l=1565-1569&rcl=344141677
     */
    projectDetails?: any
    /** The recordingDetails object encapsulates information about the location, date and address where the video was recorded. */
    recordingDetails?: VideoRecordingDetails
    /** The snippet object contains basic details about the video, such as its title, description, and category. */
    snippet?: VideoSnippet
    /** The statistics object contains statistics about the video. */
    statistics?: VideoStatistics
    /** The status object contains information about the video's uploading, processing, and privacy statuses. */
    status?: VideoStatus
    /**
     * The suggestions object encapsulates suggestions that identify opportunities to improve the video quality or the metadata for the uploaded video. This data can only be retrieved by
     * the video owner.
     */
    suggestions?: VideoSuggestions
    /** The topicDetails object encapsulates information about Freebase topics associated with the video. */
    topicDetails?: VideoTopicDetails
  }
  interface VideoAbuseReport {
    /** Additional comments regarding the abuse report. */
    comments?: string
    /** The language that the content was viewed in. */
    language?: string
    /** The high-level, or primary, reason that the content is abusive. The value is an abuse report reason ID. */
    reasonId?: string
    /** The specific, or secondary, reason that this content is abusive (if available). The value is an abuse report reason ID that is a valid secondary reason for the primary reason. */
    secondaryReasonId?: string
    /** The ID that YouTube uses to uniquely identify the video. */
    videoId?: string
  }
  interface VideoAbuseReportReason {
    /** Etag of this resource. */
    etag?: string
    /** The ID of this abuse report reason. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string `"youtube#videoAbuseReportReason"`. */
    kind?: string
    /** The `snippet` object contains basic details about the abuse report reason. */
    snippet?: VideoAbuseReportReasonSnippet
  }
  interface VideoAbuseReportReasonListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of valid abuse reasons that are used with `video.ReportAbuse`. */
    items?: VideoAbuseReportReason[]
    /** Identifies what kind of resource this is. Value: the fixed string `"youtube#videoAbuseReportReasonListResponse"`. */
    kind?: string
    /** The `visitorId` identifies the visitor. */
    visitorId?: string
  }
  interface VideoAbuseReportReasonSnippet {
    /** The localized label belonging to this abuse report reason. */
    label?: string
    /** The secondary reasons associated with this reason, if any are available. (There might be 0 or more.) */
    secondaryReasons?: VideoAbuseReportSecondaryReason[]
  }
  interface VideoAbuseReportSecondaryReason {
    /** The ID of this abuse report secondary reason. */
    id?: string
    /** The localized label for this abuse report secondary reason. */
    label?: string
  }
  interface VideoAgeGating {
    /** Indicates whether or not the video has alcoholic beverage content. Only users of legal purchasing age in a particular country, as identified by ICAP, can view the content. */
    alcoholContent?: boolean
    /**
     * Age-restricted trailers. For redband trailers and adult-rated video-games. Only users aged 18+ can view the content. The the field is true the content is restricted to viewers aged
     * 18+. Otherwise The field won't be present.
     */
    restricted?: boolean
    /** Video game rating, if any. */
    videoGameRating?: string
  }
  interface VideoCategory {
    /** Etag of this resource. */
    etag?: string
    /** The ID that YouTube uses to uniquely identify the video category. */
    id?: string
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategory". */
    kind?: string
    /** The snippet object contains basic details about the video category, including its title. */
    snippet?: VideoCategorySnippet
  }
  interface VideoCategoryListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of video categories that can be associated with YouTube videos. In this map, the video category ID is the map key, and its value is the corresponding videoCategory resource. */
    items?: VideoCategory[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#videoCategoryListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface VideoCategorySnippet {
    assignable?: boolean
    /** The YouTube channel that created the video category. */
    channelId?: string
    /** The video category's title. */
    title?: string
  }
  interface VideoContentDetails {
    /** The value of captions indicates whether the video has captions or not. */
    caption?: string
    /** Specifies the ratings that the video received under various rating schemes. */
    contentRating?: ContentRating
    /** The countryRestriction object contains information about the countries where a video is (or is not) viewable. */
    countryRestriction?: AccessPolicy
    /** The value of definition indicates whether the video is available in high definition or only in standard definition. */
    definition?: string
    /** The value of dimension indicates whether the video is available in 3D or in 2D. */
    dimension?: string
    /**
     * The length of the video. The tag value is an ISO 8601 duration in the format PT#M#S, in which the letters PT indicate that the value specifies a period of time, and the letters M
     * and S refer to length in minutes and seconds, respectively. The # characters preceding the M and S letters are both integers that specify the number of minutes (or seconds) of the
     * video. For example, a value of PT15M51S indicates that the video is 15 minutes and 51 seconds long.
     */
    duration?: string
    /** Indicates whether the video uploader has provided a custom thumbnail image for the video. This property is only visible to the video uploader. */
    hasCustomThumbnail?: boolean
    /** The value of is_license_content indicates whether the video is licensed content. */
    licensedContent?: boolean
    /** Specifies the projection format of the video. */
    projection?: string
    /**
     * The regionRestriction object contains information about the countries where a video is (or is not) viewable. The object will contain either the
     * contentDetails.regionRestriction.allowed property or the contentDetails.regionRestriction.blocked property.
     */
    regionRestriction?: VideoContentDetailsRegionRestriction
  }
  interface VideoContentDetailsRegionRestriction {
    /**
     * A list of region codes that identify countries where the video is viewable. If this property is present and a country is not listed in its value, then the video is blocked from
     * appearing in that country. If this property is present and contains an empty list, the video is blocked in all countries.
     */
    allowed?: string[]
    /**
     * A list of region codes that identify countries where the video is blocked. If this property is present and a country is not listed in its value, then the video is viewable in that
     * country. If this property is present and contains an empty list, the video is viewable in all countries.
     */
    blocked?: string[]
  }
  interface VideoFileDetails {
    /** A list of audio streams contained in the uploaded video file. Each item in the list contains detailed metadata about an audio stream. */
    audioStreams?: VideoFileDetailsAudioStream[]
    /** The uploaded video file's combined (video and audio) bitrate in bits per second. */
    bitrateBps?: string
    /** The uploaded video file's container format. */
    container?: string
    /**
     * The date and time when the uploaded video file was created. The value is specified in ISO 8601 format. Currently, the following ISO 8601 formats are supported: - Date only:
     * YYYY-MM-DD - Naive time: YYYY-MM-DDTHH:MM:SS - Time with timezone: YYYY-MM-DDTHH:MM:SS+HH:MM
     */
    creationTime?: string
    /** The length of the uploaded video in milliseconds. */
    durationMs?: string
    /** The uploaded file's name. This field is present whether a video file or another type of file was uploaded. */
    fileName?: string
    /** The uploaded file's size in bytes. This field is present whether a video file or another type of file was uploaded. */
    fileSize?: string
    /**
     * The uploaded file's type as detected by YouTube's video processing engine. Currently, YouTube only processes video files, but this field is present whether a video file or another
     * type of file was uploaded.
     */
    fileType?: string
    /** A list of video streams contained in the uploaded video file. Each item in the list contains detailed metadata about a video stream. */
    videoStreams?: VideoFileDetailsVideoStream[]
  }
  interface VideoFileDetailsAudioStream {
    /** The audio stream's bitrate, in bits per second. */
    bitrateBps?: string
    /** The number of audio channels that the stream contains. */
    channelCount?: number
    /** The audio codec that the stream uses. */
    codec?: string
    /** A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code. */
    vendor?: string
  }
  interface VideoFileDetailsVideoStream {
    /** The video content's display aspect ratio, which specifies the aspect ratio in which the video should be displayed. */
    aspectRatio?: number
    /** The video stream's bitrate, in bits per second. */
    bitrateBps?: string
    /** The video codec that the stream uses. */
    codec?: string
    /** The video stream's frame rate, in frames per second. */
    frameRateFps?: number
    /** The encoded video content's height in pixels. */
    heightPixels?: number
    /** The amount that YouTube needs to rotate the original source content to properly display the video. */
    rotation?: string
    /** A value that uniquely identifies a video vendor. Typically, the value is a four-letter vendor code. */
    vendor?: string
    /** The encoded video content's width in pixels. You can calculate the video's encoding aspect ratio as width_pixels / height_pixels. */
    widthPixels?: number
  }
  interface VideoGetRatingResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    /** A list of ratings that match the request criteria. */
    items?: VideoRating[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#videoGetRatingResponse". */
    kind?: string
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface VideoListResponse {
    /** Etag of this resource. */
    etag?: string
    /** Serialized EventId of the request which produced this response. */
    eventId?: string
    items?: Video[]
    /** Identifies what kind of resource this is. Value: the fixed string "youtube#videoListResponse". */
    kind?: string
    /** The token that can be used as the value of the pageToken parameter to retrieve the next page in the result set. */
    nextPageToken?: string
    /** General pagination information. */
    pageInfo?: PageInfo
    /** The token that can be used as the value of the pageToken parameter to retrieve the previous page in the result set. */
    prevPageToken?: string
    tokenPagination?: any
    /** The visitorId identifies the visitor. */
    visitorId?: string
  }
  interface VideoLiveStreamingDetails {
    /**
     * The ID of the currently active live chat attached to this video. This field is filled only if the video is a currently live broadcast that has live chat. Once the broadcast
     * transitions to complete this field will be removed and the live chat closed down. For persistent broadcasts that live chat id will no longer be tied to this video but rather to the
     * new video being displayed at the persistent page.
     */
    activeLiveChatId?: string
    /** The time that the broadcast actually ended. This value will not be available until the broadcast is over. */
    actualEndTime?: string
    /** The time that the broadcast actually started. This value will not be available until the broadcast begins. */
    actualStartTime?: string
    /**
     * The number of viewers currently watching the broadcast. The property and its value will be present if the broadcast has current viewers and the broadcast owner has not hidden the
     * viewcount for the video. Note that YouTube stops tracking the number of concurrent viewers for a broadcast when the broadcast ends. So, this property would not identify the number
     * of viewers watching an archived video of a live broadcast that already ended.
     */
    concurrentViewers?: string
    /** The time that the broadcast is scheduled to end. If the value is empty or the property is not present, then the broadcast is scheduled to contiue indefinitely. */
    scheduledEndTime?: string
    /** The time that the broadcast is scheduled to begin. */
    scheduledStartTime?: string
  }
  interface VideoLocalization {
    /** Localized version of the video's description. */
    description?: string
    /** Localized version of the video's title. */
    title?: string
  }
  interface VideoMonetizationDetails {
    /** The value of access indicates whether the video can be monetized or not. */
    access?: AccessPolicy
  }
  interface VideoPlayer {
    embedHeight?: string
    /** An <iframe> tag that embeds a player that will play the video. */
    embedHtml?: string
    /** The embed width */
    embedWidth?: string
  }
  interface VideoProcessingDetails {
    /**
     * This value indicates whether video editing suggestions, which might improve video quality or the playback experience, are available for the video. You can retrieve these suggestions
     * by requesting the suggestions part in your videos.list() request.
     */
    editorSuggestionsAvailability?: string
    /**
     * This value indicates whether file details are available for the uploaded video. You can retrieve a video's file details by requesting the fileDetails part in your videos.list()
     * request.
     */
    fileDetailsAvailability?: string
    /** The reason that YouTube failed to process the video. This property will only have a value if the processingStatus property's value is failed. */
    processingFailureReason?: string
    /**
     * This value indicates whether the video processing engine has generated suggestions that might improve YouTube's ability to process the the video, warnings that explain video
     * processing problems, or errors that cause video processing problems. You can retrieve these suggestions by requesting the suggestions part in your videos.list() request.
     */
    processingIssuesAvailability?: string
    /**
     * The processingProgress object contains information about the progress YouTube has made in processing the video. The values are really only relevant if the video's processing status
     * is processing.
     */
    processingProgress?: VideoProcessingDetailsProcessingProgress
    /** The video's processing status. This value indicates whether YouTube was able to process the video or if the video is still being processed. */
    processingStatus?: string
    /**
     * This value indicates whether keyword (tag) suggestions are available for the video. Tags can be added to a video's metadata to make it easier for other users to find the video. You
     * can retrieve these suggestions by requesting the suggestions part in your videos.list() request.
     */
    tagSuggestionsAvailability?: string
    /** This value indicates whether thumbnail images have been generated for the video. */
    thumbnailsAvailability?: string
  }
  interface VideoProcessingDetailsProcessingProgress {
    /**
     * The number of parts of the video that YouTube has already processed. You can estimate the percentage of the video that YouTube has already processed by calculating: 100 *
     * parts_processed / parts_total Note that since the estimated number of parts could increase without a corresponding increase in the number of parts that have already been processed,
     * it is possible that the calculated progress could periodically decrease while YouTube processes a video.
     */
    partsProcessed?: string
    /** An estimate of the total number of parts that need to be processed for the video. The number may be updated with more precise estimates while YouTube processes the video. */
    partsTotal?: string
    /** An estimate of the amount of time, in millseconds, that YouTube needs to finish processing the video. */
    timeLeftMs?: string
  }
  interface VideoRating {
    /** Rating of a video. */
    rating?: string
    /** The ID that YouTube uses to uniquely identify the video. */
    videoId?: string
  }
  interface VideoRecordingDetails {
    /** The geolocation information associated with the video. */
    location?: GeoPoint
    /** The text description of the location where the video was recorded. */
    locationDescription?: string
    /** The date and time when the video was recorded. */
    recordingDate?: string
  }
  interface VideoSnippet {
    /** The YouTube video category associated with the video. */
    categoryId?: string
    /** The ID that YouTube uses to uniquely identify the channel that the video was uploaded to. */
    channelId?: string
    /** Channel title for the channel that the video belongs to. */
    channelTitle?: string
    /** The default_audio_language property specifies the language spoken in the video's default audio track. */
    defaultAudioLanguage?: string
    /** The language of the videos's default snippet. */
    defaultLanguage?: string
    /** The video's description. @mutable youtube.videos.insert youtube.videos.update */
    description?: string
    /** Indicates if the video is an upcoming/active live broadcast. Or it's "none" if the video is not an upcoming/active live broadcast. */
    liveBroadcastContent?: string
    /** Localized snippet selected with the hl parameter. If no such localization exists, this field is populated with the default snippet. (Read-only) */
    localized?: VideoLocalization
    /** The date and time when the video was uploaded. */
    publishedAt?: string
    /** A list of keyword tags associated with the video. Tags may contain spaces. */
    tags?: string[]
    /**
     * A map of thumbnail images associated with the video. For each object in the map, the key is the name of the thumbnail image, and the value is an object that contains other
     * information about the thumbnail.
     */
    thumbnails?: ThumbnailDetails
    /** The video's title. @mutable youtube.videos.insert youtube.videos.update */
    title?: string
  }
  interface VideoStatistics {
    /** The number of comments for the video. */
    commentCount?: string
    /** The number of users who have indicated that they disliked the video by giving it a negative rating. */
    dislikeCount?: string
    /** The number of users who currently have the video marked as a favorite video. */
    favoriteCount?: string
    /** The number of users who have indicated that they liked the video by giving it a positive rating. */
    likeCount?: string
    /** The number of times the video has been viewed. */
    viewCount?: string
  }
  interface VideoStatus {
    /** This value indicates if the video can be embedded on another website. @mutable youtube.videos.insert youtube.videos.update */
    embeddable?: boolean
    /** This value explains why a video failed to upload. This property is only present if the uploadStatus property indicates that the upload failed. */
    failureReason?: string
    /** The video's license. @mutable youtube.videos.insert youtube.videos.update */
    license?: string
    madeForKids?: boolean
    /** The video's privacy status. */
    privacyStatus?: string
    /**
     * This value indicates if the extended video statistics on the watch page can be viewed by everyone. Note that the view count, likes, etc will still be visible if this is disabled.
     * @mutable youtube.videos.insert youtube.videos.update
     */
    publicStatsViewable?: boolean
    /** The date and time when the video is scheduled to publish. It can be set only if the privacy status of the video is private.. */
    publishAt?: string
    /** This value explains why YouTube rejected an uploaded video. This property is only present if the uploadStatus property indicates that the upload was rejected. */
    rejectionReason?: string
    selfDeclaredMadeForKids?: boolean
    /** The status of the uploaded video. */
    uploadStatus?: string
  }
  interface VideoSuggestions {
    /** A list of video editing operations that might improve the video quality or playback experience of the uploaded video. */
    editorSuggestions?: string[]
    /**
     * A list of errors that will prevent YouTube from successfully processing the uploaded video video. These errors indicate that, regardless of the video's current processing status,
     * eventually, that status will almost certainly be failed.
     */
    processingErrors?: string[]
    /** A list of suggestions that may improve YouTube's ability to process the video. */
    processingHints?: string[]
    /**
     * A list of reasons why YouTube may have difficulty transcoding the uploaded video or that might result in an erroneous transcoding. These warnings are generated before YouTube
     * actually processes the uploaded video file. In addition, they identify issues that are unlikely to cause the video processing to fail but that might cause problems such as sync
     * issues, video artifacts, or a missing audio track.
     */
    processingWarnings?: string[]
    /** A list of keyword tags that could be added to the video's metadata to increase the likelihood that users will locate your video when searching or browsing on YouTube. */
    tagSuggestions?: VideoSuggestionsTagSuggestion[]
  }
  interface VideoSuggestionsTagSuggestion {
    /**
     * A set of video categories for which the tag is relevant. You can use this information to display appropriate tag suggestions based on the video category that the video uploader
     * associates with the video. By default, tag suggestions are relevant for all categories if there are no restricts defined for the keyword.
     */
    categoryRestricts?: string[]
    /** The keyword tag suggested for the video. */
    tag?: string
  }
  interface VideoTopicDetails {
    /**
     * Similar to topic_id, except that these topics are merely relevant to the video. These are topics that may be mentioned in, or appear in the video. You can retrieve information about
     * each topic using Freebase Topic API.
     */
    relevantTopicIds?: string[]
    /** A list of Wikipedia URLs that provide a high-level description of the video's content. */
    topicCategories?: string[]
    /**
     * A list of Freebase topic IDs that are centrally associated with the video. These are topics that are centrally featured in the video, and it can be said that the video is mainly
     * about each of these. You can retrieve information about each topic using the < a href="http://wiki.freebase.com/wiki/Topic_API">Freebase Topic API.
     */
    topicIds?: string[]
  }
  interface WatchSettings {
    /** The text color for the video watch page's branded area. */
    backgroundColor?: string
    /** An ID that uniquely identifies a playlist that displays next to the video player. */
    featuredPlaylistId?: string
    /** The background color for the video watch page's branded area. */
    textColor?: string
  }
  interface AbuseReportsResource {
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: AbuseReport
    }): Request<AbuseReport>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: AbuseReport
    ): Request<AbuseReport>
  }
  interface ActivitiesResource {
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      channelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      home?: boolean
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      mine?: boolean
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more activity resource properties that the API response will include. If the parameter identifies a property that
       * contains child properties, the child properties will be included in the response. For example, in an activity resource, the snippet property contains other properties that
       * identify the type of activity, a display title for the activity, and so forth. If you set *part=snippet*, the API response will also contain all of those nested properties.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      publishedAfter?: string
      publishedBefore?: string
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      regionCode?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<ActivityListResponse>
  }
  interface CaptionsResource {
    /** Deletes a resource. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** ID of the Google+ Page for the channel that the request is be on behalf of */
      onBehalfOf?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Downloads a caption track. */
    download(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** The ID of the caption track to download, required for One Platform. */
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** ID of the Google+ Page for the channel that the request is be on behalf of */
      onBehalfOf?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Convert the captions into this format. Supported options are sbv, srt, and vtt. */
      tfmt?: string
      /** tlang is the language code; machine translate the captions into this language. */
      tlang?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** ID of the Google+ Page for the channel that the request is be on behalf of */
      onBehalfOf?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** The *part* parameter specifies the caption resource parts that the API response will include. Set the parameter value to snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
      sync?: boolean
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Caption
    }): Request<Caption>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /** ID of the Google+ Page for the channel that the request is be on behalf of */
        onBehalfOf?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /** The *part* parameter specifies the caption resource parts that the API response will include. Set the parameter value to snippet. */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
        sync?: boolean
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Caption
    ): Request<Caption>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Returns the captions with the given IDs for Stubby or Apiary. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** ID of the Google+ Page for the channel that the request is on behalf of. */
      onBehalfOf?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the
       * parameter value are id and snippet.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Returns the captions for the specified video. */
      videoId: string
    }): Request<CaptionListResponse>
    /** Updates an existing resource. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** ID of the Google+ Page for the channel that the request is on behalf of. */
      onBehalfOf?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the
       * parameter value are id and snippet.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
      sync?: boolean
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Caption
    }): Request<Caption>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /** ID of the Google+ Page for the channel that the request is on behalf of. */
        onBehalfOf?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * The *part* parameter specifies a comma-separated list of one or more caption resource parts that the API response will include. The part names that you can include in the
         * parameter value are id and snippet.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Extra parameter to allow automatically syncing the uploaded caption/transcript with the audio. */
        sync?: boolean
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Caption
    ): Request<Caption>
  }
  interface ChannelBannersResource {
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Unused, channel_id is currently derived from the security context of the requestor. */
      channelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: ChannelBannerResource
    }): Request<ChannelBannerResource>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Unused, channel_id is currently derived from the security context of the requestor. */
        channelId?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
         * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
         * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
         * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
         * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
         * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
         * authentication credentials for each separate channel.
         */
        onBehalfOfContentOwnerChannel?: string
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: ChannelBannerResource
    ): Request<ChannelBannerResource>
  }
  interface ChannelsResource {
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Return the channels within the specified guide category ID. */
      categoryId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Return the channel associated with a YouTube username. */
      forUsername?: string
      /**
       * Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no
       * localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX).
       */
      hl?: string
      /** Return the channels with the specified IDs. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** Return the channels managed by the authenticated user. */
      managedByMe?: boolean
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** Return the ids of channels owned by the authenticated user. */
      mine?: boolean
      /** Return the channels subscribed to the authenticated user */
      mySubscribers?: boolean
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more channel resource properties that the API response will include. If the parameter identifies a property that
       * contains child properties, the child properties will be included in the response. For example, in a channel resource, the contentDetails property contains other properties, such
       * as the uploads properties. As such, if you set *part=contentDetails*, the API response will also contain all of those nested properties.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<ChannelListResponse>
    /** Updates an existing resource. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *onBehalfOfContentOwner* parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is
       * intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and
       * channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the
       * specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. The API currently only allows the parameter value to be set to either brandingSettings or invideoPromotion. (You cannot update both of those parts with a single
       * request.) Note that this method overrides the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Channel
    }): Request<Channel>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * The *onBehalfOfContentOwner* parameter indicates that the authenticated user is acting on behalf of the content owner specified in the parameter value. This parameter is
         * intended for YouTube content partners that own and manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and
         * channel data, without having to provide authentication credentials for each individual channel. The actual CMS account that the user authenticates with needs to be linked to the
         * specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. The API currently only allows the parameter value to be set to either brandingSettings or invideoPromotion. (You cannot update both of those parts with a single
         * request.) Note that this method overrides the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Channel
    ): Request<Channel>
  }
  interface ChannelSectionsResource {
    /** Deletes a resource. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. The part names that you can include in the parameter value are snippet and contentDetails.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: ChannelSection
    }): Request<ChannelSection>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
         * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
         * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
         * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
         * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
         * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
         * authentication credentials for each separate channel.
         */
        onBehalfOfContentOwnerChannel?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. The part names that you can include in the parameter value are snippet and contentDetails.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: ChannelSection
    ): Request<ChannelSection>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Return the ChannelSections owned by the specified channel ID. */
      channelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Return content in specified language */
      hl?: string
      /** Return the ChannelSections with the given IDs for Stubby or Apiary. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** Return the ChannelSections owned by the authenticated user. */
      mine?: boolean
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more channelSection resource properties that the API response will include. The part names that you can include
       * in the parameter value are id, snippet, and contentDetails. If the parameter identifies a property that contains child properties, the child properties will be included in the
       * response. For example, in a channelSection resource, the snippet property contains other properties, such as a display title for the channelSection. If you set *part=snippet*,
       * the API response will also contain all of those nested properties.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<ChannelSectionListResponse>
    /** Updates an existing resource. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. The part names that you can include in the parameter value are snippet and contentDetails.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: ChannelSection
    }): Request<ChannelSection>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. The part names that you can include in the parameter value are snippet and contentDetails.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: ChannelSection
    ): Request<ChannelSection>
  }
  interface CommentsResource {
    /** Deletes a resource. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Comment
    }): Request<Comment>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /** The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units. */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Comment
    ): Request<Comment>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Returns the comments with the given IDs for One Platform. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /**
       * Returns replies to the specified comment. Note, currently YouTube features only one level of replies (ie replies to top level comments). However replies to replies may be
       * supported in the future.
       */
      parentId?: string
      /** The *part* parameter specifies a comma-separated list of one or more comment resource properties that the API response will include. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** The requested text format for the returned comments. */
      textFormat?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<CommentListResponse>
    /** Expresses the caller's opinion that one or more comments should be flagged as spam. */
    markAsSpam(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Flags the comments with the given IDs as spam in the caller's opinion. */
      id: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Sets the moderation status of one or more comments. */
    setModerationStatus(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /**
       * If set to true the author of the comment gets added to the ban list. This means all future comments of the author will autmomatically be rejected. Only valid in combination with
       * STATUS_REJECTED.
       */
      banAuthor?: boolean
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Modifies the moderation status of the comments with the given IDs */
      id: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /**
       * Specifies the requested moderation status. Note, comments can be in statuses, which are not available through this call. For example, this call does not allow to mark a comment
       * as 'likely spam'. Valid values: MODERATION_STATUS_PUBLISHED, MODERATION_STATUS_HELD_FOR_REVIEW, MODERATION_STATUS_REJECTED.
       */
      moderationStatus: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Updates an existing resource. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *part* parameter identifies the properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all
       * of the properties that the API request can update.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Comment
    }): Request<Comment>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * The *part* parameter identifies the properties that the API response will include. You must at least include the snippet part in the parameter value since that part contains all
         * of the properties that the API request can update.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Comment
    ): Request<Comment>
  }
  interface CommentThreadsResource {
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: CommentThread
    }): Request<CommentThread>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /** The *part* parameter identifies the properties that the API response will include. Set the parameter value to snippet. The snippet part has a quota cost of 2 units. */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: CommentThread
    ): Request<CommentThread>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Returns the comment threads of all videos of the channel and the channel comments as well. */
      allThreadsRelatedToChannelId?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Returns the comment threads for all the channel comments (ie does not include comments left on videos). */
      channelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Returns the comment threads with the given IDs for Stubby or Apiary. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** Limits the returned comment threads to those with the specified moderation status. Not compatible with the 'id' filter. Valid values: published, heldForReview, likelySpam. */
      moderationStatus?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      order?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /** The *part* parameter specifies a comma-separated list of one or more commentThread resource properties that the API response will include. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Limits the returned comment threads to those matching the specified key words. Not compatible with the 'id' filter. */
      searchTerms?: string
      /** The requested text format for the returned comments. */
      textFormat?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Returns the comment threads of the specified video. */
      videoId?: string
    }): Request<CommentThreadListResponse>
  }
  // tslint:disable-next-line:interface-name
  interface I18nLanguagesResource {
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      hl?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter specifies the i18nLanguage resource properties that the API response will include. Set the parameter value to snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<I18nLanguageListResponse>
  }
  // tslint:disable-next-line:interface-name
  interface I18nRegionsResource {
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      hl?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter specifies the i18nRegion resource properties that the API response will include. Set the parameter value to snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<I18nRegionListResponse>
  }
  interface LiveBroadcastsResource {
    /** Bind a broadcast to a stream. */
    bind(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Broadcast to bind to the stream */
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in
       * the parameter value are id, snippet, contentDetails, and status.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Stream to bind, if not set unbind the current one. */
      streamId?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<LiveBroadcast>
    /** Delete a given broadcast. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Broadcast to delete. */
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new stream for the authenticated user. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: LiveBroadcast
    }): Request<LiveBroadcast>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
         * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
         * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
         * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
         * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
         * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
         * authentication credentials for each separate channel.
         */
        onBehalfOfContentOwnerChannel?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: LiveBroadcast
    ): Request<LiveBroadcast>
    /** Retrieve the list of broadcasts associated with the given channel. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** Return broadcasts with a certain status, e.g. active broadcasts. */
      broadcastStatus?: string
      /** Return only broadcasts with the selected type. */
      broadcastType?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Return broadcasts with the given ids from Stubby or Apiary. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      mine?: boolean
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in
       * the parameter value are id, snippet, contentDetails, status and statistics.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<LiveBroadcastListResponse>
    /** Transition a broadcast to a given status. */
    transition(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** The status to which the broadcast is going to transition. */
      broadcastStatus: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Broadcast to transition. */
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more liveBroadcast resource properties that the API response will include. The part names that you can include in
       * the parameter value are id, snippet, contentDetails, and status.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<LiveBroadcast>
    /** Updates an existing broadcast for the authenticated user. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status. Note that this method will override the existing values for
       * all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a broadcast's privacy status is defined in the status part. As
       * such, if your request is updating a private or unlisted broadcast, and the request's part parameter value includes the status part, the broadcast's privacy setting will be
       * updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the broadcast will revert to
       * the default privacy setting.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: LiveBroadcast
    }): Request<LiveBroadcast>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
         * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
         * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
         * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
         * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
         * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
         * authentication credentials for each separate channel.
         */
        onBehalfOfContentOwnerChannel?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. The part properties that you can include in the parameter value are id, snippet, contentDetails, and status. Note that this method will override the existing values for
         * all of the mutable properties that are contained in any parts that the parameter value specifies. For example, a broadcast's privacy status is defined in the status part. As
         * such, if your request is updating a private or unlisted broadcast, and the request's part parameter value includes the status part, the broadcast's privacy setting will be
         * updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting will be removed and the broadcast will revert to
         * the default privacy setting.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: LiveBroadcast
    ): Request<LiveBroadcast>
  }
  interface LiveChatBansResource {
    /** Deletes a chat ban. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response
       * returns. Set the parameter value to snippet.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: LiveChatBan
    }): Request<LiveChatBan>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response
         * returns. Set the parameter value to snippet.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: LiveChatBan
    ): Request<LiveChatBan>
  }
  interface LiveChatMessagesResource {
    /** Deletes a chat message. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the
       * parameter value to snippet.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: LiveChatMessage
    }): Request<LiveChatMessage>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * The *part* parameter serves two purposes. It identifies the properties that the write operation will set as well as the properties that the API response will include. Set the
         * parameter value to snippet.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: LiveChatMessage
    ): Request<LiveChatMessage>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Specifies the localization language in which the system messages should be returned. */
      hl?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The id of the live chat for which comments should be returned. */
      liveChatId: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken property identify other pages that could be
       * retrieved.
       */
      pageToken?: string
      /** The *part* parameter specifies the liveChatComment resource parts that the API response will include. Supported values are id and snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Specifies the size of the profile image that should be returned for each user. */
      profileImageSize?: number
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<LiveChatMessageListResponse>
  }
  interface LiveChatModeratorsResource {
    /** Deletes a chat moderator. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response
       * returns. Set the parameter value to snippet.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: LiveChatModerator
    }): Request<LiveChatModerator>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response
         * returns. Set the parameter value to snippet.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: LiveChatModerator
    ): Request<LiveChatModerator>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The id of the live chat for which moderators should be returned. */
      liveChatId: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /** The *part* parameter specifies the liveChatModerator resource parts that the API response will include. Supported values are id and snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<LiveChatModeratorListResponse>
  }
  interface LiveStreamsResource {
    /** Deletes an existing stream for the authenticated user. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new stream for the authenticated user. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. The part properties that you can include in the parameter value are id, snippet, cdn, content_details, and status.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: LiveStream
    }): Request<LiveStream>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
         * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
         * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
         * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
         * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
         * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
         * authentication credentials for each separate channel.
         */
        onBehalfOfContentOwnerChannel?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. The part properties that you can include in the parameter value are id, snippet, cdn, content_details, and status.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: LiveStream
    ): Request<LiveStream>
    /** Retrieve the list of streams associated with the given channel. -- */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Return LiveStreams with the given ids from Stubby or Apiary. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      mine?: boolean
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more liveStream resource properties that the API response will include. The part names that you can include in
       * the parameter value are id, snippet, cdn, and status.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<LiveStreamListResponse>
    /** Updates an existing stream for the authenticated user. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. The part properties that you can include in the parameter value are id, snippet, cdn, and status. Note that this method will override the existing values for all of the
       * mutable properties that are contained in any parts that the parameter value specifies. If the request body does not specify a value for a mutable property, the existing value
       * for that property will be removed.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: LiveStream
    }): Request<LiveStream>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
         * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
         * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
         * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
         * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
         * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
         * authentication credentials for each separate channel.
         */
        onBehalfOfContentOwnerChannel?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. The part properties that you can include in the parameter value are id, snippet, cdn, and status. Note that this method will override the existing values for all of the
         * mutable properties that are contained in any parts that the parameter value specifies. If the request body does not specify a value for a mutable property, the existing value
         * for that property will be removed.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: LiveStream
    ): Request<LiveStream>
  }
  interface MembersResource {
    /** Retrieves a list of members that match the request criteria for a channel. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Comma separated list of channel IDs. Only data about members that are part of this list will be included in the response. */
      filterByMemberChannelId?: string
      /** Filter members in the results set to the ones that have access to a level. */
      hasAccessToLevel?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** Parameter that specifies which channel members to return. */
      mode?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /** The *part* parameter specifies the member resource parts that the API response will include. Set the parameter value to snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<MemberListResponse>
  }
  interface MembershipsLevelsResource {
    /** Retrieves a list of all pricing levels offered by a creator to the fans. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter specifies the membershipsLevel resource parts that the API response will include. Supported values are id and snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<MembershipsLevelListResponse>
  }
  interface PlaylistItemsResource {
    /** Deletes a resource. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: PlaylistItem
    }): Request<PlaylistItem>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: PlaylistItem
    ): Request<PlaylistItem>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more playlistItem resource properties that the API response will include. If the parameter identifies a property
       * that contains child properties, the child properties will be included in the response. For example, in a playlistItem resource, the snippet property contains numerous fields,
       * including the title, description, position, and resourceId properties. As such, if you set *part=snippet*, the API response will contain all of those properties.
       */
      part: string | string[]
      /** Return the playlist items within the given playlist. */
      playlistId?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Return the playlist items associated with the given video ID. */
      videoId?: string
    }): Request<PlaylistItemListResponse>
    /** Updates an existing resource. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For
       * example, a playlist item can specify a start time and end time, which identify the times portion of the video that should play when users watch the video in the playlist. If
       * your request is updating a playlist item that sets these values, and the request's part parameter value includes the contentDetails part, the playlist item's start and end times
       * will be updated to whatever value the request body specifies. If the request body does not specify values, the existing start and end times will be removed and replaced with the
       * default settings.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: PlaylistItem
    }): Request<PlaylistItem>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For
         * example, a playlist item can specify a start time and end time, which identify the times portion of the video that should play when users watch the video in the playlist. If
         * your request is updating a playlist item that sets these values, and the request's part parameter value includes the contentDetails part, the playlist item's start and end times
         * will be updated to whatever value the request body specifies. If the request body does not specify values, the existing start and end times will be removed and replaced with the
         * default settings.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: PlaylistItem
    ): Request<PlaylistItem>
  }
  interface PlaylistsResource {
    /** Deletes a resource. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Playlist
    }): Request<Playlist>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
         * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
         * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
         * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
         * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
         * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
         * authentication credentials for each separate channel.
         */
        onBehalfOfContentOwnerChannel?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Playlist
    ): Request<Playlist>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Return the playlists owned by the specified channel ID. */
      channelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Returen content in specified language */
      hl?: string
      /** Return the playlists with the given IDs for Stubby or Apiary. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** Return the playlists owned by the authenticated user. */
      mine?: boolean
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more playlist resource properties that the API response will include. If the parameter identifies a property that
       * contains child properties, the child properties will be included in the response. For example, in a playlist resource, the snippet property contains properties like author,
       * title, description, tags, and timeCreated. As such, if you set *part=snippet*, the API response will contain all of those properties.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<PlaylistListResponse>
    /** Updates an existing resource. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. Note that this method will override the existing values for mutable properties that are contained in any parts that the request body specifies. For example, a
       * playlist's description is contained in the snippet part, which must be included in the request body. If the request does not specify a value for the snippet.description
       * property, the playlist's existing description will be deleted.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Playlist
    }): Request<Playlist>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. Note that this method will override the existing values for mutable properties that are contained in any parts that the request body specifies. For example, a
         * playlist's description is contained in the snippet part, which must be included in the request body. If the request does not specify a value for the snippet.description
         * property, the playlist's existing description will be deleted.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Playlist
    ): Request<Playlist>
  }
  interface SearchResource {
    /** Retrieves a list of search resources */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Filter on resources belonging to this channelId. */
      channelId?: string
      /** Add a filter on the channel search. */
      channelType?: string
      /** Filter on the livestream status of the videos. */
      eventType?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Search owned by a content owner. */
      forContentOwner?: boolean
      /** Restrict the search to only retrieve videos uploaded using the project id of the authenticated user. */
      forDeveloper?: boolean
      /** Search for the private videos of the authenticated user. */
      forMine?: boolean
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** Filter on location of the video */
      location?: string
      /** Filter on distance from the location (specified above). */
      locationRadius?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Sort order of the results. */
      order?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /** The *part* parameter specifies a comma-separated list of one or more search resource properties that the API response will include. Set the parameter value to snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Filter on resources published after this date. */
      publishedAfter?: string
      /** Filter on resources published before this date. */
      publishedBefore?: string
      /** Textual search terms to match. */
      q?: string
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Display the content as seen by viewers in this country. */
      regionCode?: string
      /** Search related to a resource. */
      relatedToVideoId?: string
      /** Return results relevant to this language. */
      relevanceLanguage?: string
      /** Indicates whether the search results should include restricted content as well as standard content. */
      safeSearch?: string
      /** Restrict results to a particular topic. */
      topicId?: string
      /** Restrict results to a particular set of resource types from One Platform. */
      type?: string | string[]
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Filter on the presence of captions on the videos. */
      videoCaption?: string
      /** Filter on videos in a specific category. */
      videoCategoryId?: string
      /** Filter on the definition of the videos. */
      videoDefinition?: string
      /** Filter on 3d videos. */
      videoDimension?: string
      /** Filter on the duration of the videos. */
      videoDuration?: string
      /** Filter on embeddable videos. */
      videoEmbeddable?: string
      /** Filter on the license of the videos. */
      videoLicense?: string
      /** Filter on syndicated videos. */
      videoSyndicated?: string
      /** Filter on videos of a specific type. */
      videoType?: string
    }): Request<SearchListResponse>
  }
  interface SubscriptionsResource {
    /** Deletes a resource. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Subscription
    }): Request<Subscription>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Subscription
    ): Request<Subscription>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Return the subscriptions of the given channel owner. */
      channelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Return the subscriptions to the subset of these channels that the authenticated user is subscribed to. */
      forChannelId?: string
      /** Return the subscriptions with the given IDs for Stubby or Apiary. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** Flag for returning the subscriptions of the authenticated user. */
      mine?: boolean
      myRecentSubscribers?: boolean
      /** Return the subscribers of the given channel owner. */
      mySubscribers?: boolean
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /** The order of the returned subscriptions */
      order?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more subscription resource properties that the API response will include. If the parameter identifies a property
       * that contains child properties, the child properties will be included in the response. For example, in a subscription resource, the snippet property contains other properties,
       * such as a display title for the subscription. If you set *part=snippet*, the API response will also contain all of those nested properties.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<SubscriptionListResponse>
  }
  interface SuperChatEventsResource {
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** Return rendered funding amounts in specified language. */
      hl?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. */
      maxResults?: number
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved.
       */
      pageToken?: string
      /** The *part* parameter specifies the superChatEvent resource parts that the API response will include. This parameter is currently not supported. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<SuperChatEventListResponse>
  }
  interface TestsResource {
    /** POST method. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      externalChannelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: TestItem
    }): Request<TestItem>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        externalChannelId?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: TestItem
    ): Request<TestItem>
  }
  interface ThirdPartyLinksResource {
    /** Deletes a resource. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Channel ID to which changes should be applied, for delegation. */
      externalChannelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** Delete the partner links with the given linking token. */
      linkingToken: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** Do not use. Required for compatibility. */
      part?: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Type of the link to be deleted. */
      type: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Channel ID to which changes should be applied, for delegation. */
      externalChannelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: ThirdPartyLink
    }): Request<ThirdPartyLink>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Channel ID to which changes should be applied, for delegation. */
        externalChannelId?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /** The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: ThirdPartyLink
    ): Request<ThirdPartyLink>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Channel ID to which changes should be applied, for delegation. */
      externalChannelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** Get a third party link with the given linking token. */
      linkingToken?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter specifies the thirdPartyLink resource parts that the API response will include. Supported values are linkingToken, status, and snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Get a third party link of the given type. */
      type?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<ThirdPartyLink>
    /** Updates an existing resource. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Channel ID to which changes should be applied, for delegation. */
      externalChannelId?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: ThirdPartyLink
    }): Request<ThirdPartyLink>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Channel ID to which changes should be applied, for delegation. */
        externalChannelId?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /** The *part* parameter specifies the thirdPartyLink resource parts that the API request and response will include. Supported values are linkingToken, status, and snippet. */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: ThirdPartyLink
    ): Request<ThirdPartyLink>
  }
  interface ThumbnailsResource {
    /**
     * As this is not an insert in a strict sense (it supports uploading/setting of a thumbnail for multiple videos, which doesn't result in creation of a single resource), I use a custom
     * verb here.
     */
    set(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Returns the Thumbnail with the given video IDs for Stubby or Apiary. */
      videoId: string
    }): Request<ThumbnailSetResponse>
  }
  interface VideoAbuseReportReasonsResource {
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      hl?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter specifies the videoCategory resource parts that the API response will include. Supported values are id and snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<VideoAbuseReportReasonListResponse>
  }
  interface VideoCategoriesResource {
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      hl?: string
      /** Returns the video categories with the given IDs for Stubby or Apiary. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** The *part* parameter specifies the videoCategory resource properties that the API response will include. Set the parameter value to snippet. */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      regionCode?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<VideoCategoryListResponse>
  }
  interface VideosResource {
    /** Deletes a resource. */
    delete(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Retrieves the ratings that the authorized user gave to a list of specified videos. */
    getRating(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<VideoGetRatingResponse>
    /** Inserts a new resource into this collection. */
    insert(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** Should auto-levels be applied to the upload. */
      autoLevels?: boolean
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** Notify the channel subscribers about the new video. As default, the notification is enabled. */
      notifySubscribers?: boolean
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
       * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
       * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
       * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
       * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
       * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
       * authentication credentials for each separate channel.
       */
      onBehalfOfContentOwnerChannel?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. Note that not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube
       * calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still
       * be included in the API response.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Should stabilize be applied to the upload. */
      stabilize?: boolean
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Video
    }): Request<Video>
    insert(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** Should auto-levels be applied to the upload. */
        autoLevels?: boolean
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** Notify the channel subscribers about the new video. As default, the notification is enabled. */
        notifySubscribers?: boolean
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * This parameter can only be used in a properly authorized request. *Note:* This parameter is intended exclusively for YouTube content partners. The
         * *onBehalfOfContentOwnerChannel* parameter specifies the YouTube channel ID of the channel to which a video is being added. This parameter is required when a request specifies a
         * value for the onBehalfOfContentOwner parameter, and it can only be used in conjunction with that parameter. In addition, the request must be authorized using a CMS account that
         * is linked to the content owner that the onBehalfOfContentOwner parameter specifies. Finally, the channel that the onBehalfOfContentOwnerChannel parameter value specifies must be
         * linked to the content owner that the onBehalfOfContentOwner parameter specifies. This parameter is intended for YouTube content partners that own and manage many different
         * YouTube channels. It allows content owners to authenticate once and perform actions on behalf of the channel specified in the parameter value, without having to provide
         * authentication credentials for each separate channel.
         */
        onBehalfOfContentOwnerChannel?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. Note that not all parts contain properties that can be set when inserting or updating a video. For example, the statistics object encapsulates statistics that YouTube
         * calculates for a video and does not contain values that you can set or modify. If the parameter value specifies a part that does not contain mutable values, that part will still
         * be included in the API response.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Should stabilize be applied to the upload. */
        stabilize?: boolean
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Video
    ): Request<Video>
    /** Retrieves a list of resources, possibly filtered. */
    list(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Return the videos that are in the specified chart. */
      chart?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /**
       * Stands for "host language". Specifies the localization language of the metadata to be filled into snippet.localized. The field is filled with the default metadata if there is no
       * localization in the specified language. The parameter value must be a language code included in the list returned by the i18nLanguages.list method (e.g. en_US, es_MX).
       */
      hl?: string
      /** Return videos with the given ids. */
      id?: string | string[]
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      locale?: string
      maxHeight?: number
      /**
       * The *maxResults* parameter specifies the maximum number of items that should be returned in the result set. *Note:* This parameter is supported for use in conjunction with the
       * myRating and chart parameters, but it is not supported for use in conjunction with the id parameter.
       */
      maxResults?: number
      /** Return the player with maximum height specified in */
      maxWidth?: number
      /** Return videos liked/disliked by the authenticated user. Does not support RateType.RATED_TYPE_NONE. */
      myRating?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *pageToken* parameter identifies a specific page in the result set that should be returned. In an API response, the nextPageToken and prevPageToken properties identify other
       * pages that could be retrieved. *Note:* This parameter is supported for use in conjunction with the myRating and chart parameters, but it is not supported for use in conjunction
       * with the id parameter.
       */
      pageToken?: string
      /**
       * The *part* parameter specifies a comma-separated list of one or more video resource properties that the API response will include. If the parameter identifies a property that
       * contains child properties, the child properties will be included in the response. For example, in a video resource, the snippet property contains the channelId, title,
       * description, tags, and categoryId properties. As such, if you set *part=snippet*, the API response will contain all of those properties.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Use a chart that is specific to the specified region */
      regionCode?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Use chart that is specific to the specified video category */
      videoCategoryId?: string
    }): Request<VideoListResponse>
    /** Adds a like or dislike rating to a video or removes a rating from a video. */
    rate(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      id: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      rating: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
    /** Report abuse for a video. */
    reportAbuse(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: VideoAbuseReport
    }): Request<void>
    reportAbuse(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: VideoAbuseReport
    ): Request<void>
    /** Updates an existing resource. */
    update(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /**
       * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
       * include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For
       * example, a video's privacy setting is contained in the status part. As such, if your request is updating a private video, and the request's part parameter value includes the
       * status part, the video's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting
       * will be removed and the video will revert to the default privacy setting. In addition, not all parts contain properties that can be set when inserting or updating a video. For
       * example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value
       * specifies a part that does not contain mutable values, that part will still be included in the API response.
       */
      part: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: Video
    }): Request<Video>
    update(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The actual CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /**
         * The *part* parameter serves two purposes in this operation. It identifies the properties that the write operation will set as well as the properties that the API response will
         * include. Note that this method will override the existing values for all of the mutable properties that are contained in any parts that the parameter value specifies. For
         * example, a video's privacy setting is contained in the status part. As such, if your request is updating a private video, and the request's part parameter value includes the
         * status part, the video's privacy setting will be updated to whatever value the request body specifies. If the request body does not specify a value, the existing privacy setting
         * will be removed and the video will revert to the default privacy setting. In addition, not all parts contain properties that can be set when inserting or updating a video. For
         * example, the statistics object encapsulates statistics that YouTube calculates for a video and does not contain values that you can set or modify. If the parameter value
         * specifies a part that does not contain mutable values, that part will still be included in the API response.
         */
        part: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: Video
    ): Request<Video>
  }
  interface WatermarksResource {
    /** Allows upload of watermark image and setting it for a channel. */
    set(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      channelId: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: InvideoBranding
    }): Request<void>
    set(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        channelId: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
         * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
         * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
         * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
         */
        onBehalfOfContentOwner?: string
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: InvideoBranding
    ): Request<void>
    /** Allows removal of channel watermark. */
    unset(request?: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      channelId: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * *Note:* This parameter is intended exclusively for YouTube content partners. The *onBehalfOfContentOwner* parameter indicates that the request's authorization credentials
       * identify a YouTube CMS user who is acting on behalf of the content owner specified in the parameter value. This parameter is intended for YouTube content partners that own and
       * manage many different YouTube channels. It allows content owners to authenticate once and get access to all their video and channel data, without having to provide
       * authentication credentials for each individual channel. The CMS account that the user authenticates with must be linked to the specified YouTube content owner.
       */
      onBehalfOfContentOwner?: string
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
    }): Request<void>
  }
  interface V3Resource {
    /** Updates an existing resource. */
    updateCommentThreads(request: {
      /** V1 error format. */
      "$.xgafv"?: string
      /** OAuth access token. */
      access_token?: string
      /** Data format for response. */
      alt?: string
      /** JSONP */
      callback?: string
      /** Selector specifying which fields to include in a partial response. */
      fields?: string
      /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
      key?: string
      /** OAuth 2.0 token for the current user. */
      oauth_token?: string
      /**
       * The *part* parameter specifies a comma-separated list of commentThread resource properties that the API response will include. You must at least include the snippet part in the
       * parameter value since that part contains all of the properties that the API request can update.
       */
      part?: string | string[]
      /** Returns response with indentations and line breaks. */
      prettyPrint?: boolean
      /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
      quotaUser?: string
      /** Upload protocol for media (e.g. "raw", "multipart"). */
      upload_protocol?: string
      /** Legacy upload protocol for media (e.g. "media", "multipart"). */
      uploadType?: string
      /** Request body */
      resource: CommentThread
    }): Request<CommentThread>
    updateCommentThreads(
      request: {
        /** V1 error format. */
        "$.xgafv"?: string
        /** OAuth access token. */
        access_token?: string
        /** Data format for response. */
        alt?: string
        /** JSONP */
        callback?: string
        /** Selector specifying which fields to include in a partial response. */
        fields?: string
        /** API key. Your API key identifies your project and provides you with API access, quota, and reports. Required unless you provide an OAuth 2.0 token. */
        key?: string
        /** OAuth 2.0 token for the current user. */
        oauth_token?: string
        /**
         * The *part* parameter specifies a comma-separated list of commentThread resource properties that the API response will include. You must at least include the snippet part in the
         * parameter value since that part contains all of the properties that the API request can update.
         */
        part?: string | string[]
        /** Returns response with indentations and line breaks. */
        prettyPrint?: boolean
        /** Available to use for quota purposes for server-side applications. Can be any arbitrary string assigned to a user, but should not exceed 40 characters. */
        quotaUser?: string
        /** Upload protocol for media (e.g. "raw", "multipart"). */
        upload_protocol?: string
        /** Legacy upload protocol for media (e.g. "media", "multipart"). */
        uploadType?: string
      },
      body: CommentThread
    ): Request<CommentThread>
  }
  interface YoutubeResource {
    v3: V3Resource
  }
}
