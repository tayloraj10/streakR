
import React from 'react';
import "./main.css"
import MyAppBar from '../components/app-bar';
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import 'firebase/compat/auth';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import Streaks from '../components/streaks';

const db = getFirestore();

const MainPage: React.FC = () => {
    const [data, setData] = useState<any[]>([]);
    const user = useSelector((state: RootState) => state.user.user);

    useEffect(() => {
        const fetchData = async () => {
            console.log(user?.uid)
            const querySnapshot = await getDocs(collection(db, 'streaks'));
            const dataList = querySnapshot.docs
                .map(doc => doc.data())
                .filter(doc => doc.uid === user!.uid);
            setData(dataList);
            console.log(dataList);
        };

        fetchData();
    }, []);

    return (
        <div className='container'>
            <MyAppBar />
            <Streaks streaks={data} />
        </div>
    );
};

export default MainPage;

