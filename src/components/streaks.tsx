import React from 'react';
import { Streak, StreakSubmission } from '../slices/streakSlice';
import './streaks.css';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import NewStreakDialog from './new-streak-dialog';
import { db } from '../firebase';
import { doc, deleteDoc, getDoc, updateDoc } from 'firebase/firestore';
import StreakTracker from './streak-tracker';
import CheckIcon from '@mui/icons-material/Check';
import CustomDatePicker from './date-picker';
import Box from '@mui/material/Box';
import { Button, Card, CardContent } from '@mui/material';
import { FaFire } from "react-icons/fa";


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

    const checkIfSubmissionExists = (submissions: any[], date: Date | null) => {
        return submissions.some(submission => submission.dateCreated.toDate().toDateString() === date!.toDateString());
    }

    const handleNewSubmission = async (streakID: string, dateCreated: Date | null) => {
        const newSubmission = {
            id: crypto.randomUUID(),
            dateCreated: dateCreated,
        };
        try {
            const streakRef = doc(db, 'streaks', streakID);
            const streakDoc = await getDoc(streakRef);
            if (streakDoc.exists()) {
                const streakData = streakDoc.data();
                const updatedSubmissions = [...streakData.submissions, newSubmission];
                await updateDoc(streakRef, { submissions: updatedSubmissions });
                console.log('Submission appended to streak with id: ', streakID);
            } else {
                console.error('No such document!');
            }
        } catch (error) {
            console.error('Error appending submission: ', error);
        }
    };

    const removeSubmission = async (submissionData: StreakSubmission[], streakID: string) => {
        const submission = submissionData.find(submission => submission.dateCreated.toDate().toDateString() === selectedDate!.toDateString());
        console.log(submission);
        if (submission) {
            try {
                console.log(submission.id);
                const streakRef = doc(db, 'streaks', streakID);
                const streakDoc = await getDoc(streakRef);
                if (streakDoc.exists()) {
                    const streakData = streakDoc.data();
                    const updatedSubmissions = streakData.submissions.filter((currentSubmission: StreakSubmission) => currentSubmission.id !== submission.id);
                    console.log(updatedSubmissions);
                    await updateDoc(streakRef, { submissions: updatedSubmissions });
                    console.log('Submission removed from streak with id: ', submission.id);
                } else {
                    console.error('No such document!');
                }
            } catch (error) {
                console.error('Error removing submission: ', error);
            }
        }
    }

    const calculateCurrentStreak = (submissions: StreakSubmission[]) => {
        let currentStreak = 0;
        let streakStartDate = new Date();
        const sortedSubmissions = submissions.sort((a, b) => b.dateCreated.toDate().getTime() - a.dateCreated.toDate().getTime());
        sortedSubmissions.forEach((submission, index) => {
            if (index === 0 || submission.dateCreated.toDate().getDate() === streakStartDate.getDate() - 1) {
                currentStreak++;
                streakStartDate = submission.dateCreated.toDate();
            } else {
                return;
            }
        });
        return currentStreak;
    }

    return (
        <div className='streak-main-container'>
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

            {streaks.map((streak, index) => (
                <Box key={streak.id} sx={{ marginBottom: '1em' }}>
                    <Card variant="outlined" sx={{ backgroundColor: 'primary.light' }}>
                        <CardContent>
                            <div className='streak-name-row'>
                                <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', marginRight: '.5em', color: 'white' }}>
                                    {streak.name}
                                </Typography>
                                <IconButton
                                    aria-label="add streak"
                                    onClick={() => checkIfSubmissionExists(streaks[index].submissions, selectedDate) ? removeSubmission(streaks[index].submissions, streak.id) : handleNewSubmission(streaks[index].id, selectedDate)}
                                    sx={{
                                        border: '2px solid',
                                        borderColor: checkIfSubmissionExists(streak.submissions, selectedDate) ? 'success.main' : 'warning.main',
                                        borderRadius: '50%',
                                        backgroundColor: checkIfSubmissionExists(streak.submissions, selectedDate) ? 'success.main' : 'transparent',
                                        '&:hover': {
                                            backgroundColor: 'success.main',
                                            borderColor: 'success.main',
                                            '& .MuiSvgIcon-root': {
                                                color: 'white',
                                            }
                                        },
                                        '& .MuiSvgIcon-root': {
                                            color: checkIfSubmissionExists(streak.submissions, selectedDate) ? 'white' : 'warning',
                                        }
                                    }}
                                >
                                    <CheckIcon color={checkIfSubmissionExists(streak.submissions, selectedDate) ? 'success' : 'warning'} />
                                </IconButton>
                                <IconButton color="error" aria-label="delete streak" onClick={() => handleDeleteStreak(streak.id)}>
                                    <DeleteIcon />
                                </IconButton>
                                {calculateCurrentStreak(streak.submissions) > 0 &&
                                    <div className='streak-details' style={{ display: 'flex', alignItems: 'center' }}>
                                        <Typography variant="h6" component="div" sx={{ color: 'white', fontWeight: 'bold', marginRight: '0.2em' }}>
                                            {calculateCurrentStreak(streak.submissions)}
                                        </Typography>
                                        <FaFire className='fire-icon' style={{ fontSize: '1.2em' }} />
                                    </div>}
                            </div>
                            <StreakTracker submissions={streak.submissions} />
                        </CardContent>
                    </Card>
                </Box>
            ))}
        </div>
    );
};

export default Streaks;