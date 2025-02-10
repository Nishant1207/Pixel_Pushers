SkillSync - A Social Platform for Sharing Ideas
SkillSync is a real-time social platform where users can sign up, log in, create posts, and see updates instantly. Built with React and Firebase, the app ensures a seamless user experience with real-time data synchronization and authentication.

🚀 Features
✅ User Authentication (Email/Password & Google Sign-In)
✅ Create, Read, and Display Posts in real-time
✅ Firebase Firestore as the database
✅ Responsive UI (works on mobile & desktop)
✅ Secure Authentication using Firebase
✅ Live Updates (posts appear instantly without refreshing)

📌 Tech Stack
React (Components, Hooks, Context API)
Firebase (Authentication, Firestore Database)
CSS (Responsive Design, Flexbox, Grid)
📂 Folder Structure
SkillSync/
│── src/
│   ├── components/
│   │   ├── Navbar.js       # Navigation Bar with Search, Login, Signup
│   │   ├── PostForm.js     # Form to Create Posts
│   │   ├── PostList.js     # Displays Posts in Real-time
│   │   ├── Login.js        # User Login Page
│   │   ├── Signup.js       # User Signup Page
│   │   ├── Logout.js       # Logout Button
│   │── context/
│   │   ├── Firebase.js     # Firebase Authentication & Database Config
│   ├── App.js              # Main Application
│   ├── index.js            # React Root File
│── public/
│── package.json
│── README.md
🛠 Installation & Setup
1. Clone the Repository
git clone https://github.com/your-username/SkillSync.git
cd SkillSync
2. Install Dependencies
npm install
3. Set Up Firebase
Go to Firebase Console.
Create a new project.
Enable Authentication (Email/Password + Google Sign-In).
Enable Cloud Firestore as the database.
Get your Firebase config and add it to Firebase.js:
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};
4. Start the Development Server
npm start
The app will run at http://localhost:3000/.

🎯 How It Works
User Signup/Login

Users can create an account using email/password or Google authentication.
Creating Posts

Users can write posts and submit them.
Posts appear instantly (real-time updates).
Real-time Post Display

Posts update across all devices without refreshing.
Firebase Firestore ensures instant data sync.
Logout Functionality

Users can log out anytime.
📱 Responsive Design
✅ Mobile-Friendly UI
✅ Works on Tablets & Desktops
✅ Flexbox & Grid Layouts

💡 Future Enhancements
🔹 Like & Comment on Posts
🔹 User Profile Pages
🔹 Dark Mode Toggle
🔹 Image Upload for Posts
🤝 Contributing
Want to improve SkillSync? Feel free to fork this repo and submit a pull request! 🚀

📜 License
This project is open-source and available under the MIT License.
