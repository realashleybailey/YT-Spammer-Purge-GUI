import VuexPersistence from "vuex-persist"
import encryptionToken from "./cookie"
import encryptStorage from "./encyption"

const cookieName = "_Secure_Storage_Token"
const storageKey = "secure_storage"

const vuexLocal = new VuexPersistence({
  supportCircular: true,
  storage: encryptStorage(encryptionToken(cookieName)) as never,
  key: storageKey
})

export default vuexLocal.plugin
