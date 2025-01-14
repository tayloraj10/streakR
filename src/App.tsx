import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from './firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser, clearUser } from './features/userSlice';
import { RootState } from './store';


const App = () => {
  const dispatch = useDispatch();

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

  return (
    <div style={{ padding: '1em' }}>
      <h1>Welcome to Firebase with Redux!</h1>
      {user ? (
      <p>
        Logged in as: {user.displayName} ({user.email})
      </p>
      ) : (
      <p>You are not logged in.</p>
      )}
    </div>
  );
};

export default App;