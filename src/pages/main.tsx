
import React from 'react';
import "./main.css"
import MyAppBar from '../components/app-bar';
import { useEffect, useState } from 'react';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import 'firebase/compat/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Streak } from '../slices/streakSlice';
import Streaks from '../components/streaks';

const db = getFirestore();

const MainPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        if (user) {
            const q = query(collection(db, 'streaks'), where('uid', '==', user.uid));

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const dataList = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id } as Streak));
                setData(dataList);
                console.log(dataList);
            });

            return () => unsubscribe();  // Clean up the listener
        }
    }, [user]);

    return (
        <div className='container'>
            <MyAppBar />
            <Streaks streaks={data} />
        </div>
    );
};

export default MainPage;

