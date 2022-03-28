import * as functions from "firebase-functions";

const getComments = (request: functions.https.Request, response: functions.Response<any>) => {
    request.params.id;
    response.send("Hello froadsm Firebase: " + JSON.stringify(request.params));
};

export default getComments;
