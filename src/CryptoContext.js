import axios from 'axios';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { CoinList } from './config/api';
import { auth, db } from './firebase';
const Crypto = React.createContext();

function CryptoContext({ children })
{
    const [currency, setCurrency] = useState("INR");
    const [symbol, setSymbol] = useState("₹");
    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [watchList, setWatchList] = useState([]);
    const [alert, setAlert] = useState({
        open: false,
        message: "",
        type: "success"
    });

    const fetchCoins = async () =>
    {
        setLoading(true);
        const { data } = await axios.get(CoinList(currency));
        setCoins(data);
        setLoading(false);
    };

    useEffect(() =>
    {
        onAuthStateChanged(auth, (user) =>
        {
            setUser(user);
        })
    }, [])

    useEffect(() =>
    {
        if (currency === "INR") setSymbol("₹");
        else if (currency === "USD") setSymbol("$");
    }, [currency]);

    useEffect(() =>
    {
        if (user) {
            const coinRef = doc(db, "watchlist", user?.uid);
            var unsubscribe = onSnapshot(coinRef, (coin) =>
            {
                if (coin.exists()) {
                    // console.log(coin.data().coins);
                    setWatchList(coin.data().coins);
                } else {
                    console.log("No Items in Watchlist");
                }
            });

            return () =>
            {
                unsubscribe();
            };
        }
    }, [user]);

    const state = {
        currency,
        setCurrency,
        symbol,
        coins,
        loading,
        fetchCoins,
        alert,
        setAlert,
        user,
        watchList,
        setWatchList
    }

    return (
        <Crypto.Provider value={state}>
            {children}
        </Crypto.Provider>
    )
}

export default CryptoContext

export const CryptoState = () =>
{
    return React.useContext(Crypto);
};