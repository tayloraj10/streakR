
import React from 'react';
import { Streak } from '../slices/streakSlice';
import './streaks.css';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';


interface StreaksProps {
    streaks: Streak[];
}

const Streaks: React.FC<StreaksProps> = ({ streaks }) => {
    return (
        <div className='streak-container'>
            <div className='title-row' >
                <Typography variant="h4" component="div" sx={{ fontWeight: 'bold', marginRight: '.5em' }}>
                    Your Streaks
                </Typography>
                <IconButton color="secondary" aria-label="add streak" onClick={() => console.log('Add new streak')}>
                    <AddIcon />
                </IconButton>
            </div>
            <div className='streaks' >
                {streaks.map((streak) => (
                    <div>
                        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                            {streak.name}
                        </Typography>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Streaks;