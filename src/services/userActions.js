import { setUserInfo } from "../redux/reducers/userSlice.js";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import getFirebaseErrorMessage from "../utils/getMessage.js";
import firebase from "../firebaseConfig.js";

const { db, auth } = firebase;

export const fetchUser = async (userId, dispatch) => {
  try {
    const userQuery = query(
      collection(db, "users"),
      where("uid", "==", userId)
    );
    const querySnapshot = await getDocs(userQuery);

    if (!querySnapshot.empty) {
      querySnapshot.forEach((doc) => {
        const userData = doc.data();

        // Convert the `createdAt` timestamp to a serializable format
        const createdAt = userData.createdAt?.toDate().toISOString() || null;

        const serializedUserData = {
          ...userData,
          createdAt, // Override the Timestamp with ISO string
        };

        dispatch(setUserInfo(serializedUserData));
      });
    } else {
      console.error("No user data found!");
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};

export const logInUser = async (formData) => {
  const { email, password } = formData;
  let response;
  console.log(auth);
  try {
    // Attempt sign-in with email and password
    await signInWithEmailAndPassword(auth, email, password);

    const user = auth.currentUser;
    if (user) {
      // If sign-in is successful, store user ID in local storage
      localStorage.setItem("CurrentUser", user.uid);

      // Prepare success response
      response = {
        status: 200,
        userId: user.uid,
        message: "Login successful!",
      };
    } else {
      // If for some reason, the user object is not available
      response = {
        status: 400,
        message: "User is not authenticated.",
      };
    }
  } catch (err) {
    // Handle errors, log the error for debugging
    console.error("Firebase login error:", err);

    // Check if err.code is available and pass it to getFirebaseErrorMessage
    const errorMessage = err.code
      ? getFirebaseErrorMessage(err.code)
      : "Unknown error occurred";

    // Prepare failure response
    response = {
      status: 400,
      message: errorMessage,
    };
  }

  return response;
};

export const registerUser = async (formData, navigate) => {
  const { email, password, confirmPassword, username } = formData;

  if (password !== confirmPassword) {
    return "Passwords do not match.";
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    await addDoc(collection(db, "users"), {
      name: user.displayName,
      email: user.email,
      createdAt: new Date(),
      uid: user.uid,
    });

    navigate("/login");
  } catch (error) {
    return getFirebaseErrorMessage(error.message);
  }
};

export const signOutUser = async () => {
  try {
    signOut(auth);
  } catch (err) {
    console.error(err, err.message);
  }
};

export const getAllUsers = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));

    // Collect users in an array
    const usersArray = querySnapshot.docs.map((doc) => ({
      id: doc.id, // Include the document ID if needed
      ...doc.data(), // Spread the document data
    }));

    return usersArray;
  } catch (error) {
    console.error("Error fetching all users:", error);
    return []; // Return an empty array in case of an error
  }
};
