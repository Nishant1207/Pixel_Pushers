import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from 'firebase/app';
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
    storageBucket: "novels-78c96.appspot.com",
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

export const FirebaseProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        onAuthStateChanged(firebaseAuth, (currentUser) => {
            setUser(currentUser || null);
        });
    }, []);

    useEffect(() => {
        const postsRef = ref(database, "posts");
        onValue(postsRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const loadedPosts = Object.values(data);
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
            timestamp: Date.now()
        });
    };

    // ✅ Upload File to Firebase Storage
    const uploadFile = async (file) => {
        if (!user) throw new Error("User is not logged in!");

        const fileRef = storageRef(storage, `uploads/${user.uid}/${file.name}`);
        await uploadBytes(fileRef, file);
    };

    return (
        <FirebaseContext.Provider value={{
            user,
            signupUserWithEmailAndPassword,
            signinUserWithEmailAndPassword,
            signInWithGoogle,
            logoutUser,
            createPost,
            uploadFile,
            isLoggedIn: !!user,
            posts
        }}>
            {children}
        </FirebaseContext.Provider>
    );
};

// Hook to use Firebase
export const useFirebase = () => useContext(FirebaseContext);
