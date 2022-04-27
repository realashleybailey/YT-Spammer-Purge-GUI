import Cookie from "js-cookie"
import { v4 } from "uuid"

// Create cookie to store encryption token.
const cookieEncryptionToken = (cookieName: string) => {
  // Generate a random encryption token.
  const token = v4()

  // Store the encryption token in a cookie.
  Cookie.set(cookieName, token)

  return token
}

// Get the encryption token from cookie or generate a new one.
const encryptionToken = (cookieName: string) => {
  return Cookie.get(cookieName) || cookieEncryptionToken(cookieName)
}

export default encryptionToken
