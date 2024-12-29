const {onCall} = require("firebase-functions/v2/https");
const admin = require("firebase-admin");

// Initialize Firebase Admin
admin.initializeApp();

// Logger for debugging
const logger = require("firebase-functions/logger");

// Function to set user role
exports.setUserRole = onCall(async (request) => {
  try {
    // Log the request for debugging
    logger.info("setUserRole called", {
      caller: request.auth,
      requestData: request.data,
      structuredData: true
    });

    // Verify the caller is an admin
    const caller = request.auth;
    if (!caller) {
      throw new Error('Must be logged in to set roles');
    }
    
    const callerUid = caller.uid;
    
    // Get the caller's claims to check if they're an admin
    const callerClaims = (await admin.auth().getUser(callerUid)).customClaims;
    
    if (!callerClaims?.admin) {
      throw new Error('Unauthorized. Only admins can set roles.');
    }

    const {uid, role} = request.data;
    
    // Valid roles
    const validRoles = ['admin', 'manager', 'canvasser', 'inspector'];
    if (!validRoles.includes(role)) {
      throw new Error('Invalid role specified');
    }

    // Set the custom claims
    await admin.auth().setCustomUserClaims(uid, {
      admin: role === 'admin',
      manager: role === 'manager',
      canvasser: role === 'canvasser',
      inspector: role === 'inspector',
      role: role // store the role name directly
    });

    logger.info("Role set successfully", {
      uid: uid,
      role: role,
      structuredData: true
    });

    return {success: true, message: `Role ${role} set for user ${uid}`};
  } catch (error) {
    logger.error('Error setting user role:', {
      error: error,
      structuredData: true
    });
    throw new Error(error.message);
  }
});

// Function to get initial admin
exports.initializeAdmin = onCall(async (request) => {
  try {
    logger.info("initializeAdmin called", {
      caller: request.auth,
      structuredData: true
    });

    // Get total users count
    const usersList = await admin.auth().listUsers(1);
    
    // If this is the first user, make them an admin
    if (usersList.users.length === 1) {
      const firstUser = usersList.users[0];
      await admin.auth().setCustomUserClaims(firstUser.uid, {
        admin: true,
        role: 'admin'
      });

      logger.info("Initial admin set", {
        uid: firstUser.uid,
        structuredData: true
      });

      return {success: true, message: 'Initial admin set'};
    }
    
    return {success: false, message: 'Admin already exists'};
  } catch (error) {
    logger.error('Error initializing admin:', {
      error: error,
      structuredData: true
    });
    throw new Error(error.message);
  }
});

// Function to get user claims/role
exports.getUserRole = onCall(async (request) => {
  try {
    logger.info("getUserRole called", {
      caller: request.auth,
      structuredData: true
    });

    if (!request.auth) {
      throw new Error('Must be logged in to check roles');
    }

    const user = await admin.auth().getUser(request.auth.uid);
    return {
      success: true,
      claims: user.customClaims || {},
      role: user.customClaims?.role || null
    };
  } catch (error) {
    logger.error('Error getting user role:', {
      error: error,
      structuredData: true
    });
    throw new Error(error.message);
  }
});