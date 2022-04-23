import { collection, getDocs, getFirestore } from "firebase/firestore"

const getVideos = async (userId: string) => {
  // If no userId is provided, return an error
  if (!userId) throw new Error("No userId provided")

  // Get the firestore instance
  const db = getFirestore()

  // Get the videos collection
  const videosRef = collection(db, "users", userId, "videos")

  // Get the videos
  const videos = await getDocs(videosRef)

  // Return the videos
  return videos.docs.map((doc) => doc.data())
}

export default getVideos
