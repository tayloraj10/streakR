import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import streakReducer from './slices/streakSlice';

const store = configureStore({
    reducer: {
        user: userReducer,
        streaks: streakReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;