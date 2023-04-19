import { Snackbar } from '@mui/material';
import React from 'react'
import { CryptoState } from '../CryptoContext'
import MuiAlert from '@mui/material/Alert';

function Alert()
{
    const { alert, setAlert } = CryptoState();

    const handleCloseAlert = (event, reason) =>
    {
        if (reason === 'clickaway') {
            return;
        }
        setAlert({ ...alert, open: false });
    };

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={3000}
            onClose={handleCloseAlert}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
            <MuiAlert
                onClose={handleCloseAlert}
                elevation={10}
                variant="filled"
                severity={alert.type}
            >
                {alert.message}
            </MuiAlert>
        </Snackbar>
    )
}

export default Alert