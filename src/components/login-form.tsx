import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import "./login-form.css"

if (!firebase.apps.length) {
    firebase.initializeApp({
        apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
        authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
        projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
        storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
        messagingSenderId: import.meta.env.VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
        appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID
    });
}



const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
            console.log('User logged in:', userCredential.user);
            navigate('/'); // Redirect to home on successful login
        } catch (error) {
            setError((error as any).message);
        }
    };

    return (
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Login</button>
            </form>
            {error && <p>{error}</p>}
        </div>
    );
};

export default LoginForm;