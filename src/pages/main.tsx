
import React from 'react';
import "./main.css"
import MyAppBar from '../components/app-bar';

const MainPage: React.FC = () => {
    return (
        <div className='container' >
            <div className='app-bar'>
                <MyAppBar />
            </div>
        </div>
    );
};

export default MainPage;