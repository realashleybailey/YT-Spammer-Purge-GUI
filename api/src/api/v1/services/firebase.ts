import * as admin from "firebase-admin";
import * as serviceAccount from "../../../configs/service.json";

const firebase = admin.apps.length === 0
    ? admin.initializeApp({
        credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
    })
    : admin.app();

export default firebase;