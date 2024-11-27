import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import SignUp from "./pages/SignUp";
import Question from "./pages/Question";
import Profile from "./pages/Profile";
import Answer from "./pages/Answer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/question" element={<Question />} />
                    <Route path="/answer" element={<Answer />} />
                    <Route path="/profile" element={<Profile />} />
                </Routes>
            </Router>
        </AuthProvider>
    </React.StrictMode>
);
