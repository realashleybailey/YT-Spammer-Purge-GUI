import { collection, getDocs, getFirestore } from "firebase/firestore"

const getSpam = async (userId: string) => {
  try {
    // If no userId is provided, return an error
    if (!userId) throw new Error("No userId provided")

    // Get the firestore instance
    const db = getFirestore()

    // Get the comments collection
    const spamRef = collection(db, "users", userId, "spam")

    // Get the comments
    const spam = await getDocs(spamRef)

    // Return the comments
    return spam.docs.map((doc) => doc.data())
  } catch (error) {
    console.log(error)
  }
}

export default getSpam
