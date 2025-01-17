import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Timestamp } from 'firebase/firestore';

// Define the shape of the user state
export interface StreaksState {
    streaks: Streak[] | null;
}

// Define the shape of the user object (customize fields as per your requirements)
export interface Streak {
    id: string;
    userID: string;
    name: string;
    submissions: StreakSubmission[];
    category: string;
    dateCreated: Date;
}

export interface StreakSubmission {
    id: string;
    dateCreated: Timestamp;
}

// Define the initial state
const initialState: StreaksState = {
    streaks: null,
};

// Create the slice
const streakSlice = createSlice({
    name: 'streaks',
    initialState,
    reducers: {
        setStreaks: (state, action: PayloadAction<Streak[]>) => {
            state.streaks = action.payload;
        },
        addStreak: (state, action: PayloadAction<Streak>) => {
            state.streaks?.push(action.payload);
        },
        removeStreak: (state, action: PayloadAction<Streak>) => {
            state.streaks = state.streaks ? state.streaks.filter((streak) => streak.id !== action.payload.id) : null;
        }
    },
});

// Export actions
export const { setStreaks, addStreak, removeStreak } = streakSlice.actions;

// Selector with type safety
export const selectUser = (state: { streaks: StreaksState }) => state.streaks;

// Export the reducer
export default streakSlice.reducer;