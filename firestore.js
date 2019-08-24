const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
  //   databaseURL: "https://simple-api-c9196.firebaseio.com"
});

module.exports = admin.firestore();
