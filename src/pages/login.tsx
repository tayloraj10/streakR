
import React from 'react';
import LoginForm from '../components/login-form';
import './login.css';

const LoginPage: React.FC = () => {
    return (
        <div className='container'>
            <LoginForm />
        </div>
    );
};

export default LoginPage;