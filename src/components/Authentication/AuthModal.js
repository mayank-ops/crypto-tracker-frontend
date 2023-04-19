import { AppBar, Box, Button, Modal, Tab, Tabs } from '@mui/material';
import React from 'react'
import { makeStyles } from '@mui/styles';
import Login from './Login';
import Signup from './Signup';
import GoogleButton from 'react-google-button';
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { CryptoState } from '../../CryptoContext';

const useStyles = makeStyles((theme) => ({
    style: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: 24,
        padding: 4,
    },
    google: {
        padding: 24,
        paddingTop: 0,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        gap: 20,
        fontSize: 20,
    },
}))

function AuthModal()
{
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => { setValue(newValue); };

    const classes = useStyles();

    const { setAlert } = CryptoState();

    const signInWithGoogle = () =>
    {
        signInWithPopup(auth, provider)
            .then((res) =>
            {
                setAlert({
                    open: true,
                    message: `Sign Up Successful. Welcome ${res.user.email}`,
                    type: "success",
                });

                handleClose();
            })
            .catch((error) =>
            {
                setAlert({
                    open: true,
                    message: error.message,
                    type: "error",
                });
                return;
            });
    }

    return (
        <div>
            <Button
                variant="contained"
                style={{
                    width: 85,
                    height: 40,
                    marginLeft: 15,
                    backgroundColor: "#EEBC1D",
                }}
                onClick={handleOpen}
            >
                Login
            </Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className={classes.style}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        variant="fullWidth"
                        style={{ borderRadius: 10 }}
                    >
                        <Tab label="Login" />
                        <Tab label="Signup" />
                    </Tabs>
                    {value === 0 && <Login handleClose={handleClose} />}
                    {value === 1 && <Signup handleClose={handleClose} />}
                    <Box className={classes.google}>
                        <span>OR</span>
                        <GoogleButton
                            style={{ width: "100%", outline: "none" }}
                            onClick={signInWithGoogle}
                        />
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default AuthModal