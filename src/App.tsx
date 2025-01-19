import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, clearUser } from './slices/userSlice';
import { RootState } from './store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login';
import MainPage from './pages/main';
import firebase from 'firebase/compat/app';


const App = () => {
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

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Get the user from the Redux state
  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({ uid: user.uid, email: user.email, displayName: user.displayName })
        );
      } else {
        dispatch(clearUser());
      }
    });

    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      navigate('/'); // Redirect to home if signed in
    } else {
      navigate('/login'); // Redirect to login if not signed in
    }
  }, [user, navigate]);

  return (
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
};

export default App;