const { admin, auth, db } = require('../config/firebase-config');

// Handles user signup
exports.signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    // Create user with email and password
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // Store additional user data in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      email: userRecord.email,
      name: userRecord.displayName,
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });

    res.status(201).json({ message: 'User created successfully', uid: userRecord.uid });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Handles user login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Firebase Auth doesn't have a direct login function with email/password from the Admin SDK,
    // you'd typically handle this on the frontend using the client SDK.
    // However, a common backend approach is to use a custom token.
    // For a public-facing API, you'll want to use Firebase's client-side SDK for direct login.
    // This is a simplified example to show backend-only logic.

    // This is a placeholder for a custom login endpoint, but it's
    // generally not how Firebase auth is used in a server-side context.
    // The more secure and recommended approach is to let the frontend
    // handle the login with the client SDK and then send the ID token
    // to the backend for verification.

    // Let's create a more realistic example for a full-stack app.
    // The backend verifies the user's ID token sent from the frontend.
    const idToken = req.headers.authorization.split('Bearer ')[1];
    const decodedToken = await auth.verifyIdToken(idToken);
    const uid = decodedToken.uid;

    res.status(200).json({ message: 'Login successful', uid });

  } catch (error) {
    res.status(401).json({ error: 'Invalid credentials or token' });
  }
};