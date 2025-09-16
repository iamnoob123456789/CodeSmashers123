const admin = require('firebase-admin');

// Support initialization via environment variables to avoid committing keys
// Required env vars (from Firebase service account):
// FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY
function initializeFirebaseAdmin() {
  if (admin.apps.length) {
    return admin.app();
  }

  const { FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY } = process.env;

  if (FIREBASE_PROJECT_ID && FIREBASE_CLIENT_EMAIL && FIREBASE_PRIVATE_KEY) {
    const privateKey = FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n');
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId: FIREBASE_PROJECT_ID,
        clientEmail: FIREBASE_CLIENT_EMAIL,
        privateKey,
      }),
    });
  } else {
    // Fallback to application default credentials if running in an env that supports it
    admin.initializeApp({
      credential: admin.credential.applicationDefault(),
    });
  }

  return admin.app();
}

initializeFirebaseAdmin();

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };