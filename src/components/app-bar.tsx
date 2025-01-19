import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import Chip from '@mui/material/Chip';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Typography } from '@mui/material';


const MyAppBar: React.FC = () => {
    const user = useSelector((state: RootState) => state.user.user);
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            firebase.auth().signOut();
            console.log('User logged out');
            navigate('/');
        } catch (error) {
        }
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ flexGrow: 1 }} />
                    <Typography variant="h4" component="div" sx={{ fontWeight: 'bold' }}>
                        StreakR
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />
                    {user && (
                        <Chip
                            label={user.email || 'User'}
                            color="primary"
                            sx={{ mr: 2 }}
                        />
                    )}
                    <Button variant='contained' onClick={handleLogout}>Logout</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default MyAppBar;