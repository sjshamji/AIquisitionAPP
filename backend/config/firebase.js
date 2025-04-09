const admin = require('firebase-admin');

// Initialize Firebase Admin with service account
const serviceAccount = require('../serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://aiquisition-bbd3f.firebaseio.com"
});

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth }; 