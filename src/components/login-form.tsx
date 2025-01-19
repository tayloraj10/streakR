import { useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { useNavigate } from 'react-router-dom';
import "./login-form.css"
import Button from '@mui/material/Button';


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

    const loginTest = async () => {
        try {
            await firebase.auth().signInWithEmailAndPassword('tayloraj10@gmail.com', '123456');
        } catch (error) {
            setError((error as any).message);
        }
    }

    return (
        <div className="login-container">
            <Button variant='contained' onClick={loginTest}><strong>Login as Test User</strong></Button>
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
            {error && <p>Invalid Login</p>}
        </div>
    );
};

export default LoginForm;