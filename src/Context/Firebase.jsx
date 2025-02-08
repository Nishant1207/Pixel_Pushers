import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
import React from "react";
import { 
    getAuth, 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    onAuthStateChanged,
    signOut
} from 'firebase/auth';
import { getDatabase, ref, push, set, onValue } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import { getStorage, ref as storageRef, uploadBytes } from 'firebase/storage';

// Create Firebase Context
const FirebaseContext = createContext(null);

// Firebase Configuration
const firebaseConfig = {
    apiKey: "AIzaSyCHY2Rapq-A0vdnO1XBcI1sh9JUoYOqiws",
    authDomain: "novels-78c96.firebaseapp.com",
    databaseURL: "https://novels-78c96-default-rtdb.firebaseio.com",
    projectId: "novels-78c96",
    storageBucket: "novels-78c96.firebasestorage.app",
    messagingSenderId: "517654489939",
    appId: "1:517654489939:web:a1b3292d70db6771408fa6"
};

// Initialize Firebase Services
const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);
const database = getDatabase(firebaseApp);

const googleProvider = new GoogleAuthProvider();

export const FirebaseProvider = (props) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]); // ✅ Store posts

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (user) => {
            setUser(user || null);
        });
    }, []);

    // Fetch Posts from Database
    useEffect(() => {
        const postsRef = ref(database, "posts");
        onValue(postsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const loadedPosts = Object.values(data);
                setPosts(loadedPosts); // ✅ Set posts in state
            } else {
                setPosts([]);
            }
        });
    }, []);

    // Create a New Post
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
            timestamp: Date.now()
        });
    };

    // Check if User is Logged In
    const isLoggedIn = !!user;

    return (
        <FirebaseContext.Provider value={{
            createPost,
            isLoggedIn,
            posts, // ✅ Expose posts
        }}>
            {props.children}
        </FirebaseContext.Provider>
    );
};

// Hook for Using Firebase
export const useFirebase = () => useContext(FirebaseContext);
