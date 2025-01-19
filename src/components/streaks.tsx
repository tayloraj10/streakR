import React from 'react';
import { Streak } from '../slices/streakSlice';
import './streaks.css';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NewStreakDialog from './new-streak-dialog';
import { db } from '../firebase'; // Make sure to import your Firestore instance
import { doc, deleteDoc } from 'firebase/firestore';

interface StreaksProps {
    streaks: Streak[];
}

const Streaks: React.FC<StreaksProps> = ({ streaks }) => {
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    }

    const handleDeleteStreak = async (id: string) => {
        console.log('Deleting streak with id: ', id);
        try {
            await deleteDoc(doc(db, 'streaks', id));
            console.log('Streak deleted with id: ', id);
        } catch (error) {
            console.error('Error deleting streak: ', error);
        }
    };

    return (
        <div className='streak-container'>
            <div className='title-row' >
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', marginRight: '.5em' }}>
                    Your Streaks
                </Typography>
                <IconButton color="success" aria-label="add streak" onClick={() => setOpen(true)}>
                    <AddIcon />
                </IconButton>
                {open && <NewStreakDialog open={open} handleClose={handleClose} />}

            </div>
            {streaks.map((streak) => (
                <div key={streak.id} className='streak-name-row'>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginRight: '.5em' }}>
                        {streak.name}
                    </Typography>
                    <IconButton color="success" aria-label="add streak" onClick={() => console.log('Add new streak')}>
                        <AddIcon />
                    </IconButton>
                    <IconButton color="error" aria-label="add streak" onClick={() => handleDeleteStreak(streak.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div>
            ))}
        </div>
    );
};

export default Streaks;