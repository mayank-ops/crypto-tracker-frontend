import { Avatar, Button, Drawer, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { signOut } from 'firebase/auth';
import React from 'react'
import { CryptoState } from '../../CryptoContext';
import { auth, db } from '../../firebase';
import { numberWithCommas } from '../Banner/Carousel';
import DeleteIcon from '@mui/icons-material/Delete';
import { doc, setDoc } from 'firebase/firestore';

const useStyles = makeStyles(() => ({
    container: {
        width: 350,
        padding: 25,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        fontFamily: "monospace",
    },
    profile: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        height: "92%",
    },
    watchlist: {
        flex: 1,
        width: "100%",
        backgroundColor: "grey",
        borderRadius: 10,
        padding: 15,
        paddingTop: 10,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 12,
        overflowY: "scroll",
    },
    coin: {
        padding: 10,
        borderRadius: 5,
        color: "black",
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#EEBC1D",
        boxShadow: "0 0 3px black",
    },
}))

function UserSidebar()
{
    const [state, setState] = React.useState({
        right: false,
    });

    const { user, setAlert, coins, watchList, symbol, setWatchList } = CryptoState();
    const classes = useStyles();

    const toggleDrawer = (anchor, open) => (event) =>
    {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open });
    };

    const removeFromWatchlist = async (coin) =>
    {
        const coinRef = doc(db, "watchlist", user.uid);
        try {
            await setDoc(
                coinRef,
                { coins: watchList.filter((wish) => wish !== coin?.id) },
                { merge: true }
            );

            setAlert({
                open: true,
                message: `${coin.name} Removed from the Watchlist !`,
                type: "success",
            });
        } catch (error) {
            setAlert({
                open: true,
                message: error.message,
                type: "error",
            });
        }
    }

    const logOut = async () =>
    {
        await signOut(auth);
        setAlert({
            open: true,
            type: "success",
            message: "Logout Successfull !!",
        });
        setWatchList([]);
        toggleDrawer();
    }

    return (
        <>
            {['right'].map((anchor) => (
                <React.Fragment key={anchor}>
                    <Avatar
                        onClick={toggleDrawer(anchor, true)}
                        style={{
                            height: 38,
                            width: 38,
                            marginLeft: 15,
                            cursor: "pointer",
                            backgroundColor: "#EEBC1D",
                        }}
                        src={user.photoURL}
                        alt={user.displayName || user.email}
                    />
                    <Drawer
                        anchor={anchor}
                        open={state[anchor]}
                        onClose={toggleDrawer(anchor, false)}
                    >
                        <div className={classes.container}>
                            <div className={classes.profile}>
                                <Avatar
                                    style={{
                                        cursor: "pointer",
                                        backgroundColor: "#EEBC1D",
                                        objectFit: "contain",
                                        height: '200px',
                                        width: '200px'
                                    }}
                                    src={user.photoURL}
                                    alt={user.displayName || user.email}
                                />
                                <span
                                    style={{
                                        width: "100%",
                                        fontSize: 25,
                                        textAlign: "center",
                                        fontWeight: "bolder",
                                        wordWrap: "break-word",
                                    }}
                                >
                                    {user.displayName || user.email}
                                </span>
                                <div className={classes.watchlist}>
                                    <span style={{ fontSize: 15, textShadow: "0 0 5px black" }}>
                                        Watchlist
                                    </span>
                                    {coins.map((coin) =>
                                    {
                                        if (watchList.includes(coin.id))
                                            return (
                                                <div className={classes.coin}>
                                                    <span>{coin.name}</span>
                                                    <span style={{ display: "flex", gap: 8 }}>
                                                        {symbol}{" "}
                                                        {numberWithCommas(coin.current_price.toFixed(2))}
                                                        <IconButton>
                                                            <DeleteIcon
                                                                style={{ cursor: "pointer" }}
                                                                fontSize="10px"
                                                                onClick={() => removeFromWatchlist(coin)}
                                                            />
                                                        </IconButton>
                                                    </span>
                                                </div>
                                            );
                                        else return <></>;
                                    })}
                                </div>
                            </div>
                            <Button
                                variant="contained"
                                onClick={logOut}
                                style={{
                                    height: "8%",
                                    width: "100%",
                                    backgroundColor: "#EEBC1D",
                                    marginTop: 20,
                                }}
                            >
                                Log Out
                            </Button>
                        </div>
                    </Drawer>
                </React.Fragment>
            ))}
        </>
    )
}

export default UserSidebar