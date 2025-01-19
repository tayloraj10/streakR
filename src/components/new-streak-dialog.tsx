import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import TextField from '@mui/material/TextField';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { useState } from 'react';
import { db } from '../firebase'; // Adjust the import based on your firebase configuration
import { collection, addDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import CustomSnackbar from './snackbar';

interface NewStreakDialogProps {
    open: boolean;
    handleClose: () => void;
}

const NewStreakDialog: React.FC<NewStreakDialogProps> = ({ open, handleClose }) => {
    const user = useSelector((state: RootState) => state.user.user);
    const [name, setName] = useState('');
    const [category, setCategory] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [nameError, setNameError] = useState(false);
    const [categoryError, setCategoryError] = useState(false);

    const handleSnackbarClose = () => {
        setOpenSnackbar(false);
    }

    const handleAddStreak = async () => {
        setNameError(name === '');
        setCategoryError(category === '');

        if (name !== '' && category !== '') {
            try {
                await addDoc(collection(db, 'streaks'), {
                    name: name,
                    category: category,
                    uid: user?.uid,
                    dateCreated: new Date(),
                    submissions: [],
                });
                handleClose();
            } catch (error) {
                console.error("Error adding document: ", error);
            }
        }
    };

    return (
        <Dialog open={open} >
            <DialogTitle>Add New Streak</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Enter the details for your new streak.
                </DialogContentText>
                <TextField
                    margin="dense"
                    id="name"
                    label="Streak Name"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={nameError}
                    helperText={nameError ? 'Streak name is required' : ''}
                />
                <TextField
                    margin="dense"
                    id="category"
                    label="Category"
                    type="text"
                    fullWidth
                    variant="standard"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    error={categoryError}
                    helperText={categoryError ? 'Category is required' : ''}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleAddStreak}>Add</Button>
            </DialogActions>
            <CustomSnackbar message={'Streak Submitted!'} open={openSnackbar} onClose={handleSnackbarClose} />
        </Dialog>
    );
};

export default NewStreakDialog;