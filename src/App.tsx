import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, clearUser } from './slices/userSlice';
import { RootState } from './store';
import { Route, Routes, useNavigate } from 'react-router-dom';
import LoginPage from './pages/login';
import MainPage from './pages/main';


const App = () => {
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