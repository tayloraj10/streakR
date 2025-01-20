import React from 'react';
import { StreakSubmission } from '../slices/streakSlice';
import './streak-tracker.css';
import Card from '@mui/material/Card';
import { CardContent, Typography } from '@mui/material';


interface StreakTrackerProps {
    submissions: StreakSubmission[];
}

const StreakTracker: React.FC<StreakTrackerProps> = ({ submissions }) => {
    return (
        <div className='streak-tracker-container'>
            {submissions
                .sort((a, b) => b.dateCreated.toDate().getTime() - a.dateCreated.toDate().getTime())
                .map((submission, index) => (
                    <Card key={index} className='submission-item' sx={{ backgroundColor: 'black', color: 'white', border: '2px solid', borderColor: 'secondary.main', padding: 0, marginRight: '.5rem' }} >
                        <CardContent >
                            <Typography color='secondary' sx={{ fontWeight: 'bold', color: 'white' }}>
                                {submission.dateCreated.toDate().toLocaleDateString('en-US', { day: 'numeric', month: 'numeric' })}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
        </div>
    )

}

export default StreakTracker;