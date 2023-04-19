import { AppBar, Container, MenuItem, Select, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { makeStyles } from '@mui/styles'
import { useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CryptoState } from '../CryptoContext';
import AuthModal from './Authentication/AuthModal';
import UserSidebar from './Authentication/UserSidebar';

const useStyles = makeStyles({
    title: {
        flex: 1,
        color: "gold",
        cursor: "pointer",
    },
});

function Header()
{
    const classes = useStyles();
    const history = useNavigate();
    const { currency, setCurrency, user } = CryptoState();
    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            mode: 'dark',
        },
    });

    return (
        <ThemeProvider theme={darkTheme}>
            <AppBar color='transparent' position='static'>
                <Container>
                    <Toolbar>
                        <Typography
                            className={classes.title}
                            style={{ fontFamily: 'Montserrat', fontWeight: 'bold' }}
                            onClick={() => { history('/') }}
                            variant="h6"
                        >
                            Crypto Tracker
                        </Typography>
                        <Select
                            variant='outlined'
                            style={{ width: 100, height: 40, marginRight: 15 }}
                            value={currency}
                            onChange={(e) => { setCurrency(e.target.value) }}
                        >
                            <MenuItem value={"USD"}>USD</MenuItem>
                            <MenuItem value={"INR"}>INR</MenuItem>
                        </Select>
                        {user ? <UserSidebar /> : <AuthModal />}
                    </Toolbar>
                </Container>
            </AppBar>
        </ThemeProvider>
    )
}

export default Header