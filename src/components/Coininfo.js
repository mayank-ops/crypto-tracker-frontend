import React, { useEffect, useState } from 'react'
import { CryptoState } from '../CryptoContext';
import { makeStyles } from '@mui/styles';
import axios from 'axios';
import { HistoricalChart } from '../config/api';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { Button, CircularProgress } from '@mui/material';
import 'chart.js/auto';
import { Chart } from 'react-chartjs-2';
import Selectbutton from './Selectbutton';

const useStyles = makeStyles((theme) => ({
    container: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
            width: "100%",
            marginTop: 0,
            padding: 20,
            paddingTop: 0,
        },
    },
}))

const chartDays = [
    {
        label: "24 Hours",
        value: 1,
    },
    {
        label: "30 Days",
        value: 30,
    },
    {
        label: "3 Months",
        value: 90,
    },
    {
        label: "1 Year",
        value: 365,
    },
];

function Coininfo({ coin })
{

    const [historicData, setHistoricData] = useState();
    const [days, setDays] = useState(1);
    const { currency } = CryptoState();
    const classes = useStyles();

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: '#fff',
            },
            mode: 'dark',
        },
    });

    const fetchHistoricData = async () =>
    {
        const { data } = await axios.get(HistoricalChart(coin.id, days, currency));
        // setflag(true);
        setHistoricData(data.prices);
    };

    useEffect(() =>
    {
        fetchHistoricData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [days]);

    return (
        <ThemeProvider theme={darkTheme}>
            <div className={classes.container}>
                {
                    !historicData ? (
                        <CircularProgress
                            style={{ color: "gold" }}
                            size={250}
                            thickness={1}
                        />
                    ) : (
                        <>
                            <Chart
                                type='line'
                                data=
                                {{
                                    labels: historicData.map((coin) =>
                                    {
                                        let date = new Date(coin[0]);
                                        let time =
                                            date.getHours() > 12
                                                ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                                                : `${date.getHours()}:${date.getMinutes()} AM`;
                                        return days === 1 ? time : date.toLocaleDateString();
                                    }),
                                    datasets: [
                                        {
                                            data: historicData.map((coin) => coin[1]),
                                            label: `Price ( Past ${days} Days ) in ${currency}`,
                                            borderColor: "#EEBC1D",
                                        },
                                    ],
                                }}
                                options={{
                                    elements: {
                                        point: {
                                            radius: 1,
                                        },
                                    },
                                }}
                            />
                            <div
                                style={{
                                    display: "flex",
                                    marginTop: 20,
                                    justifyContent: "space-around",
                                    width: "100%",
                                }}>
                                {
                                    chartDays.map((day) => (
                                        <Selectbutton
                                            key={day.value}
                                            onClick={() => { setDays(day.value) }}
                                            selected={day.value === days}
                                        >
                                            {day.label}
                                        </Selectbutton>
                                    ))
                                }
                            </div>
                        </>
                    )
                }
            </div>
        </ThemeProvider>
    )
}

export default Coininfo