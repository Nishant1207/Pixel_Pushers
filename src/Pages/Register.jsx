import React, { useState } from "react";
import { useFirebase } from "../Context/Firebase"; 
import { useNavigate } from "react-router";
import '../CSS/Register.css';

export const RegisterPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            await firebase.signupUserWithEmailAndPassword(email, password); // ✅ Fixed function call
            alert("Registration Successful");
            navigate("/login");
        } catch (error) {
            console.error("Registration Error:", error);

            if (error.code === "auth/email-already-in-use") {
                alert("This email is already registered. Please log in.");
            } else if (error.code === "auth/invalid-email") {
                alert("Invalid email format. Please enter a valid email.");
            } else if (error.code === "auth/weak-password") {
                alert("Password should be at least 6 characters long.");
            } else {
                alert("Registration failed: " + error.message);
            }
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit} autoComplete="off">
                <h2>Create an Account</h2>

                {/* Hidden input to prevent autofill */}
                <input type="text" name="fakeEmail" style={{ display: "none" }} autoComplete="off" />

                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input 
                        type="email" 
                        id="email"
                        name="email"
                        required 
                        autoComplete="off"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        id="password"
                        name="password"
                        required 
                        autoComplete="new-password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                </div>

                <button type="submit" className="register-btn">Register</button>
                
                <div className="divider">OR</div>

                <button 
                    type="button" 
                    className="google-btn"
                    onClick={firebase.signInWithGoogle}
                >
                    Sign up With Google
                </button>

                <p className="login-link">
                    Already have an account? <a href="/login">Login here</a>
                </p>
            </form>
        </div>
    );
};
