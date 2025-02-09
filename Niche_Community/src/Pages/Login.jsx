import React, { useState } from "react";
import { useFirebase } from "../Context/Firebase";
import { useNavigate } from "react-router";
import '../CSS/Login.css';

export const LoginPage = () => {
    const firebase = useFirebase();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in user...");

        try {
            await firebase.signinUserWithEmailAndPassword(email, password);
            alert("Login Successful");
            setEmail("");
            setPassword("")
            navigate("/");
        } catch (error) {
            console.error("Login Error:", error);

            if (error.code === "auth/user-not-found") {
                alert("No account found with this email. Please sign up first.");
                setEmail("");
                setPassword("")
            } else if (error.code === "auth/wrong-password") {
                alert("Incorrect password. Please try again.");
                setEmail("");
                setPassword("")
            } else if (error.code === "auth/invalid-email") {
                alert("Invalid email format. Please enter a valid email.");
                setEmail("");
                setPassword("")
            } else if (error.code === "auth/invalid-credential") {
                alert("Invalid credentials. Please check your email and password.");
                setEmail("");
                setPassword("")
            } else {
                alert("Login failed: " + error.message);
                setEmail("");
                setPassword("")
            }
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit} autoComplete="off">
                <h2>Login to ConnectHub</h2>

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

                <button
                    type="submit"
                    className="login-btn"
                >
                    Login
                </button>

                <div className="divider">OR</div>

                <button
                    type="button"
                    className="google-btn"
                    onClick={firebase.signInWithGoogle}
                >
                    Sign in With Google
                </button>

                <p className="signup-link">
                    Don't have an account? <a href="/register">Sign up here</a>
                </p>
            </form>
        </div>
    );
};