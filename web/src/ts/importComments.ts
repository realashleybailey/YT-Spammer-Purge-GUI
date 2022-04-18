import { collection, doc, getDoc, getDocs, getFirestore, query, setDoc, writeBatch } from "firebase/firestore"
import dataset from "../assets/json/datasetComments.json"

const importComments = () => {
  const db = getFirestore()

  let totalCycle = 0
  let cycle = 0
  let batch = writeBatch(db)

  for (const comment of dataset) {
    cycle++
    totalCycle++

    console.log(`${totalCycle} / ${comment.COMMENT_ID}`)

    const docRef = doc(db, "users", "cL6vtDtHZIWdNp0G4kNkMArDG9Q2", "comments", comment.COMMENT_ID)

    if (cycle >= 450) {
      cycle = 0
      batch.commit()
      batch = writeBatch(db)
    }

    batch.set(docRef, comment, {
      merge: false
    })
  }

  batch.commit()
}

const importSpamMarkers = () => {
  const db = getFirestore()

  let totalCycle = 0
  let cycle = 0
  let batch = writeBatch(db)

  for (const comment of dataset) {
    cycle++
    totalCycle++

    console.log(`${totalCycle} / ${comment.COMMENT_ID}`)

    if ((comment.CLASS === 1)) {
      const docRef = doc(db, "users", "cL6vtDtHZIWdNp0G4kNkMArDG9Q2", "spam", comment.COMMENT_ID)

      if (cycle >= 450) {
        cycle = 0
        batch.commit()
        batch = writeBatch(db)
      }

      batch.set(
        docRef,
        {
          spam: true,
          reason: "Test data for the spam filter (comment ID: " + comment.COMMENT_ID + ")",
          id: comment.COMMENT_ID
        },
        {
          merge: false
        }
      )
    }
  }

  batch.commit()
}

const convertComments = async () => {
  const db = getFirestore()

  const commentsRef = collection(db, "users", "cL6vtDtHZIWdNp0G4kNkMArDG9Q2", "comments")
  const comments = await getDocs(commentsRef)

  let totalCycle = 0
  let cycle = 0
  let batch = writeBatch(db)

  comments.forEach((comment) => {
    // Update cycle
    cycle++
    totalCycle++

    // Data for the comment
    const data = comment.data()

    console.log(`${totalCycle} / ${data.COMMENT_ID}`)

    // Doc Ref
    const docRef = doc(db, "users", "cL6vtDtHZIWdNp0G4kNkMArDG9Q2", "comments", data.COMMENT_ID)

    // Template for new comment
    const template = {
      id: data.COMMENT_ID,
      kind: "youtube#commentThread",
      snippet: {
        canReply: true,
        channelId: "UC_aE0rQ1_9rsTo4Iwb2rbwQ",
        isPublic: true,
        topLevelComment: {
          id: data.COMMENT_ID,
          kind: "youtube#comment",
          snippet: {
            authorChannelId: {
              value: "UCN0gW-uBwOrOw-eVDB4zoGg"
            },
            authorChannelUrl: "http://www.youtube.com/channel/UCN0gW-uBwOrOw-eVDB4zoGg",
            authorDisplayName: data.AUTHOR,
            authorProfileImageUrl: "https://i.ytimg.com/vi/QH-Q-QH-QH-Q/hqdefault.jpg",
            canRate: true,
            channelId: "UC_aE0rQ1_9rsTo4Iwb2rbwQ",
            likeCount: 1,
            publishedAt: data.DATE + "Z",
            textDisplay: data.CONTENT,
            textOriginal: data.CONTENT,
            updatedAt: data.DATE + "Z",
            videoId: "wq75TpSwAT4",
            viewerRating: "like"
          }
        },
        totalReplyCount: 0,
        videoId: "wq75TpSwAT4"
      }
    }

    if (cycle >= 450) {
      cycle = 0
      batch.commit()
      batch = writeBatch(db)
    }

    batch.set(docRef, template, {
      merge: false
    })
  })

  batch.commit()
}

export { importComments, importSpamMarkers, convertComments }
