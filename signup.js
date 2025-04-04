import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";

// Firebase Configuration
import firebaseConfig from "./config.js";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Form submission handler
document.getElementById("signupForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorMessage = document.getElementById("error-message");
  const signupButton = document.getElementById("signupButton");

  errorMessage.textContent = "";
  
  if (!name || !email || !password) {
    errorMessage.textContent = "All fields are required.";
    return;
  }

  // Disable button to prevent multiple clicks
  signupButton.disabled = true;
  signupButton.textContent = "Signing Up...";

  try {
    await createUserWithEmailAndPassword(auth, email, password);
    alert("Sign-up successful! Redirecting to login...");
    window.location.href = "login.html";
  } catch (error) {
    console.error("Signup Error:", error);
    errorMessage.textContent = error.message || "Something went wrong. Please try again.";
  } finally {
    // Re-enable button after process completion
    signupButton.disabled = false;
    signupButton.textContent = "Sign Up";
  }
});
