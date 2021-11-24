import { useState } from 'react';
// import pauler from '../../assets/jake-paul-trump.jpg';
import './App.css';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const getRandomInt = (_min: number, _max: number): number => {
  // console.log(_min, _max);
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max + 1 - min) + min); // The maximum is exclusive and the minimum is inclusive
};

// const errStyle = {
//   color: '#f6ff23',
//   fontSize: '2rem',
// };

const targetStyle = {
  fontSize: '10rem',
  margin: '0',
  color: '#00ff3c',
};

const gridContainerStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  rowGap: '0.5rem',
};

const toggleButtonStyle = {
  marginTop: '2rem',
};

const summaryStyle = {
  marginBottom: '2rem',
};

const Root = () => {
  const [running, setRunning] = useState(false);
  const [min, setMin] = useState(1);
  const [max, setMax] = useState(2);
  const [interval, setInter] = useState(1);
  const [target, setTarget] = useState(getRandomInt(min, max));
  const [timer, setTimer] = useState(0); // Interval timer for the game loop.
  const [errMsg, setErrMsg] = useState('');

  const [open, setOpen] = useState(false);

  // onClose?: (event: React.SyntheticEvent<any>, reason: SnackbarCloseReason) => void;
  const handleClose = () => {
    // if (reason === 'clickaway') {
    //   return;
    // }

    setOpen(false);
  };

  const action = (
    <>
      <Button onClick={handleClose} />
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const toggleGameState = () => {
    // Start generating numbers if the inputs are valid.
    if (!running) {
      if (min > max) {
        setMin(1);
        setOpen(true);
        setRunning(false);
        setErrMsg('Min must be less than max');
        return;
      }
      setRunning(true);

      setTimer(
        window.setInterval(() => {
          const newTarget = getRandomInt(min, max);
          // while (newTarget === target) {
          //   newTarget = getRandomInt(min, max);
          // }
          setTarget(newTarget);
        }, interval * 1000)
      );
    } else {
      window.clearInterval(timer);
      setTimer(0);
      setRunning(false);
    }
  };

  return (
    <div>
      <div className="Hello">
        {/* <img width="300px" alt="icon" src={pauler} /> */}
        <p>yards</p>
        <h1 style={targetStyle}>{running ? target : '-'}</h1>
        <p style={summaryStyle}>
          Generating a random number between {min} and {max} every {interval} seconds.
        </p>

        <div style={gridContainerStyle}>
          {/* Minimum number input. */}
          <span>Min Yards</span>
          <input
            id="minInput"
            type="number"
            min={1}
            max={max - 1}
            value={min}
            onChange={(e) => setMin(parseInt(e.target.value, 10))}
          />

          {/* Max number input. */}
          <span>Max Yards</span>
          <input
            type="number"
            min={2}
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value, 10))}
          />

          {/* Interval number input. */}
          <span>Timer Length</span>
          <input
            type="number"
            min={1}
            value={interval}
            onChange={(e) => setInter(parseInt(e.target.value, 10))}
          />
        </div>

        {/* Start/stop button. */}
        <Button
          style={toggleButtonStyle}
          onClick={toggleGameState}
          variant="contained"
          color={!running ? 'success' : 'error'}
        >
          {running ? 'Stop' : 'Start'}
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message={errMsg}
          action={action}
        />
      </div>
    </div>
  );
};

export default function App() {
  return <Root />;
}
