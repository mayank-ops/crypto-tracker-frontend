import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Coinpage from './pages/Coinpage';
import Homepage from './pages/Homepage';
import { makeStyles } from '@mui/styles';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Alert from './components/Alert';

let theme = createTheme();

const useStyles = makeStyles({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  },
});

function App()
{
  const classes = useStyles();

  return (
    <BrowserRouter>
      <div className={classes.App}>
        <Header />
        <Routes>
          <Route exact path='/' element={<Homepage />} />
          <Route exact path='/coins/:id' element={<ThemeProvider theme={theme}><Coinpage /></ThemeProvider>} />
        </Routes>
      </div>
      <Alert />
    </BrowserRouter>
  );
}

export default App;
