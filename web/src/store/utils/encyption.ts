import { EncryptStorage } from "encrypt-storage"

const encryptStorage = (encryptionToken: string) => {
  return new EncryptStorage(encryptionToken, {
    stateManagementUse: true
  })
}

export default encryptStorage
