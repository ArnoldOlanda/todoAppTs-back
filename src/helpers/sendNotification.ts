import * as admin from "firebase-admin";
import { Message } from "firebase-admin/lib/messaging/messaging-api";

// This registration token comes from the client FCM SDKs.
const registrationToken = "YOUR_REGISTRATION_TOKEN";

const message: Message = {
    data: {
        score: "850",
        time: "2:45",
    },
    token: registrationToken,
};

// Send a message to the device corresponding to the provided
// registration token.

export const sendNotification = (message: Message) => {
    admin
        .messaging()
        .send(message)
        .then((response) => {
            // Response is a message ID string.
            console.log("Successfully sent message:", response);
        })
        .catch((error) => {
            console.log("Error sending message:", error);
        });
};
