import { collection, getDocs, getFirestore } from "firebase/firestore"

const getComments = async (userId: string) => {
  try {
    // If no userId is provided, return an error
    if (!userId) throw new Error("No userId provided")

    // Get the firestore instance
    const db = getFirestore()

    // Get the comments collection
    const commentsRef = collection(db, "users", userId, "comments")

    // Get the comments
    const comments = await getDocs(commentsRef)

    console.log("Comments:", comments)

    // Return the comments
    return comments.docs.map((doc) => doc.data())
  } catch (error) {
    console.log(error)
  }
}

export default getComments
