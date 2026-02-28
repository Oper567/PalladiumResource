const { auth, db } = require('../config/db');

// @desc    Register a new user in Firebase Auth & Firestore
exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    // 1. Create user in Firebase Auth
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: name,
    });

    // 2. Save additional info (like isAdmin) in Firestore
    const userData = {
      name,
      email,
      isAdmin: false, // Default role
      createdAt: new Date().toISOString(),
    };
    
    await db.collection('users').doc(userRecord.uid).set(userData);

    res.status(201).json({ uid: userRecord.uid, ...userData });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// NOTE: Login (authUser) is usually handled on the Frontend with Firebase SDK,
// then the token is sent here for verification. 
exports.authUser = async (req, res) => {
  res.status(200).json({ message: "Login logic moved to Frontend SDK" });
};

exports.getUserProfile = async (req, res) => {
  // req.user is populated by the 'protect' middleware
  res.json(req.user);
};
