import * as functions from "firebase-functions";
import getComments from "./controllers/getComments";

export const helloWorld = functions.https.onRequest((request, response) => {
    functions.logger.info("Hello logs!", {structuredData: true});
    response.send("Hello froadsm Firebase!");
});

export const gay = functions.https.onRequest(getComments);
