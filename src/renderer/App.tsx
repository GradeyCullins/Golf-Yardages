import { useState } from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
// import pauler from '../../assets/jake-paul-trump.jpg';
import './App.css';

const getRandomInt = (_min: number, _max: number): number => {
  const min = Math.ceil(_min);
  const max = Math.floor(_max);
  return Math.floor(Math.random() * (max + 1 - min) + min); // The maximum is exclusive and the minimum is inclusive
};

const errStyle = {
  color: '#f6ff23',
  fontSize: '2rem',
};

const targetStyle = {
  fontSize: '4rem',
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
  const [err, setErr] = useState('');
  const [timer, setTimer] = useState(0); // Interval timer for the game loop.

  const toggleGameState = () => {
    // Start generating numbers if the inputs are valid.
    if (!running) {
      if (min > max) {
        setMin(1);
        setErr('Min must be less than max');
        setRunning(false);
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
        <h1 style={targetStyle}>{target} yards</h1>
        <h2>Status: {running ? 'running' : 'stopped'}</h2>
        {err !== '' && <p style={errStyle}>{err}</p>}
        <p style={summaryStyle}>
          Generating a random number between {min} and {max} every {interval} seconds.
        </p>

        <div style={gridContainerStyle}>
          {/* Minimum number input. */}
          <span className="col-1">Minimum value</span>
          <input
            id="minInput"
            type="number"
            min={1}
            max={max - 1}
            value={min}
            className="col-1"
            onChange={(e) => setMin(parseInt(e.target.value, 10))}
          />

          {/* Max number input. */}
          <span className="col-1">Maximum value</span>
          <input
            type="number"
            min={2}
            value={max}
            onChange={(e) => setMax(parseInt(e.target.value, 10))}
          />

          {/* Interval number input. */}
          <span className="col-1">Timer</span>
          <input
            type="number"
            min={1}
            value={interval}
            onChange={(e) => setInter(parseInt(e.target.value, 10))}
          />
        </div>

        {/* Start/stop button. */}
        <button
          style={toggleButtonStyle}
          onClick={toggleGameState}
          type="button"
        >
          {running ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" component={Root} />
      </Switch>
    </Router>
  );
}
