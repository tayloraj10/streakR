import React from 'react';
import { Streak } from '../slices/streakSlice';
import './streaks.css';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NewStreakDialog from './new-streak-dialog';
import { db } from '../firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import StreakTracker from './streak-tracker';
import CheckIcon from '@mui/icons-material/Check';
import CustomDatePicker from './date-picker';
import Box from '@mui/material/Box';
import { Button } from '@mui/material';


interface StreaksProps {
    streaks: Streak[];
}

const Streaks: React.FC<StreaksProps> = ({ streaks }) => {
    const [open, setOpen] = React.useState(false);
    const [selectedDate, setSelectedDate] = React.useState<Date | null>(new Date());

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
                <IconButton
                    color="success"
                    aria-label="add streak"
                    onClick={() => setOpen(true)}
                    sx={{ transform: 'scale(1.5)' }}
                >
                    <AddIcon />
                </IconButton>
                <Box sx={{ flexGrow: 1 }}></Box>
                <div className='date-picker-row'>
                    <Button variant='contained' sx={{ marginRight: '1em' }} onClick={() => { setSelectedDate(new Date()) }}>
                        <Typography sx={{ fontWeight: 'bold' }}>Today</Typography>
                    </Button>
                    <CustomDatePicker selectedDate={selectedDate} handleChange={(date: Date | null) => { setSelectedDate(date) }} />
                </div>
                {open && <NewStreakDialog open={open} selectedDate={selectedDate} handleClose={handleClose} />}

            </div>
            {streaks.map((streak) => (
                <><div key={streak.id} className='streak-name-row'>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginRight: '.5em' }}>
                        {streak.name}
                    </Typography>
                    <IconButton
                        aria-label="add streak"
                        onClick={() => console.log('Add new streak')}
                        sx={{
                            border: '2px solid',
                            borderColor: 'info.main',
                            borderRadius: '50%'
                        }}
                    >
                        <CheckIcon color='info' />
                    </IconButton>
                    <IconButton color="error" aria-label="add streak" onClick={() => handleDeleteStreak(streak.id)}>
                        <DeleteIcon />
                    </IconButton>
                </div><StreakTracker submissions={streak.submissions} /></>
            ))}
        </div>
    );
};

export default Streaks;