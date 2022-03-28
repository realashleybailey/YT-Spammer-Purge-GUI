import store from "@/store"
import { onAuthStateChanged, getAuth, signOut } from "firebase/auth"

const API_KEY = "AIzaSyABD1VkFV_gMVxhQGVNlME_yVv-djBZw4w"
const CLIENT_ID = "451656004495-nt01u5u1ep6e641qrto3gugna1e711u3.apps.googleusercontent.com"
const SCOPES = ["https://www.googleapis.com/auth/youtube.readonly", "https://www.googleapis.com/auth/yt-analytics.readonly"]
const DISCOVERY_DOCS = ["https://youtubeanalytics.googleapis.com/$discovery/rest?version=v2", "https://youtube.googleapis.com/$discovery/rest?version=v3"]

export async function start() {
  gapi.load("client:auth2", watch)
}

export async function watch() {
  await gapi.client.init({ clientId: CLIENT_ID, apiKey: API_KEY })
  gapi.client.load("youtube", "v3", async function () {
    const first = await loop(null)
    const looping = first.totalResults / first.resultsPerPage

    let pageToken = first.nextPageToken || null

    for (let i = 0; i < looping; i++) {
      const waiting = await loop(pageToken)
      pageToken = waiting.nextPageToken || null
      waiting.items?.forEach((item) => {
        console.log(item.snippet?.topLevelComment?.snippet?.textDisplay)
      })
    }
  })
}

export async function loop(pageToken: string | null) {
  const response = await gapi.client.youtube.commentThreads.list({ part: ["id", "snippet"], allThreadsRelatedToChannelId: "UC_aE0rQ1_9rsTo4Iwb2rbwQ", maxResults: 100, pageToken: pageToken !== null ? pageToken : "" })

  const items = response.result.items
  const nextPageToken = response.result.nextPageToken
  const totalResults = response.result.pageInfo?.totalResults ?? 0
  const resultsPerPage = response.result.pageInfo?.resultsPerPage ?? 0

  return { items, nextPageToken, totalResults, resultsPerPage }
}
