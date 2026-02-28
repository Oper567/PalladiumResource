const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase immediately so the services are available for export
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('🔥 Firebase Admin Initialized');
}

const db = admin.firestore();
const auth = admin.auth();

// Simplified connectDB just to log status in server.js
const connectDB = () => {
  console.log('✅ Firebase Services Ready');
};

module.exports = { connectDB, db, auth };
