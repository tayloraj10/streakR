import React from 'react';
import { Button, Snackbar, SnackbarContent } from '@mui/material';

interface SnackbarProps {
    message: string;
    open: boolean;
    onClose: () => void;
}

const CustomSnackbar: React.FC<SnackbarProps> = ({ message, open, onClose }) => {
    return (
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            open={open}
            autoHideDuration={5000}
            onClose={onClose}
        >
            <SnackbarContent
                message={message}
                action={
                    <Button onClick={onClose}>Close</Button>
                }
            />
        </Snackbar>
    );
};

export default CustomSnackbar;