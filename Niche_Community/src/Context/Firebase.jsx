import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut
} from "firebase/auth";
import { getDatabase, ref, push, set, onValue, update } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage, ref as storageRef, uploadBytes } from "firebase/storage";

// 🔥 Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCHY2Rapq-A0vdnO1XBcI1sh9JUoYOqiws",
  authDomain: "novels-78c96.firebaseapp.com",
  databaseURL: "https://novels-78c96-default-rtdb.firebaseio.com",
  projectId: "novels-78c96",
  storageBucket: "novels-78c96.appspot.com",
  messagingSenderId: "517654489939",
  appId: "1:517654489939:web:a1b3292d70db6771408fa6"
};

// ✅ Initialize Firebase Services
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);

const googleProvider = new GoogleAuthProvider();

// 🔥 Create Firebase Context
const FirebaseContext = createContext(null);

export const FirebaseProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  // ✅ Listen for Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => unsubscribe();
  }, []);

  // ✅ Fetch Posts in Real Time
  useEffect(() => {
    const postsRef = ref(database, "posts");
    onValue(postsRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        const loadedPosts = Object.keys(data).map((key) => ({
          id: key,
          ...data[key]
        }));
        setPosts(loadedPosts);
      } else {
        setPosts([]);
      }
    });
  }, []);

  // ✅ Register User with Email and Password
  const signupUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // ✅ Login User with Email and Password
  const signinUserWithEmailAndPassword = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  // ✅ Sign in with Google
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(firebaseAuth, googleProvider);
      return result.user;
    } catch (error) {
      throw error;
    }
  };

  // ✅ Logout User
  const logoutUser = async () => {
    try {
      await signOut(firebaseAuth);
      setUser(null);
    } catch (error) {
      throw error;
    }
  };

  // ✅ Create a New Post
  const createPost = async (title, content, category) => {
    if (!user) throw new Error("User is not logged in!");

    const postsRef = ref(database, "posts");
    const newPostRef = push(postsRef);
    await set(newPostRef, {
      id: newPostRef.key,
      title,
      content,
      category,
      userID: user.uid,
      userEmail: user.email,
      timestamp: Date.now(),
      upvotes: 0, // 🆕 Initialize upvotes to zero
      downvotes: 0 // 🆕 Initialize downvotes to zero
    });
  };

  // ✅ Upload File to Firebase Storage
  const uploadFile = async (file) => {
    if (!user) throw new Error("User is not logged in!");

    const fileRef = storageRef(storage, `uploads/${user.uid}/${file.name}`);
    await uploadBytes(fileRef, file);
  };

  // ✅ Update Post Votes (Upvote/Downvote)
  const updatePostVotes = async (postId, type) => {
    const postRef = ref(database, `posts/${postId}`);

    onValue(postRef, (snapshot) => {
      if (snapshot.exists()) {
        const postData = snapshot.val();
        const newVotes = {
          upvotes: postData.upvotes || 0,
          downvotes: postData.downvotes || 0
        };

        // Update vote count based on the type
        if (type === "upvote") {
          newVotes.upvotes += 1;
        } else if (type === "downvote") {
          newVotes.downvotes += 1;
        }

        // Update Firebase with new vote counts
        update(postRef, newVotes);
      }
    }, { onlyOnce: true });
  };

  const [searchQuery, setSearchQuery] = useState("");

  return (
    <FirebaseContext.Provider
      value={{
        user,
        setSearchQuery,
        signupUserWithEmailAndPassword,
        signinUserWithEmailAndPassword,
        signInWithGoogle,
        logoutUser,
        createPost,
        uploadFile,
        updatePostVotes,  // 🆕 Added updatePostVotes function
        isLoggedIn: !!user,
        posts
      }}
    >
      {children}
    </FirebaseContext.Provider>
  );
};

export const useFirebase = () => useContext(FirebaseContext);
