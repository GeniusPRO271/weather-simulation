import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card';

function App() {
  const [forcast, setForcast] = useState([]);
  const [days, setDays] = useState(15);

  function predictWeather(timeUnits) {
    // Define the states
    const states = ['Cloudy', 'Sunny', 'Rain', 'Snow'];

    // Define the transition probabilities
    const transitionMatrix = {
      Cloudy: { Cloudy: 0.3, Sunny: 0.3, Rain: 0.3, Snow: 0.1 },
      Sunny: { Cloudy: 0.2, Sunny: 0.6, Rain: 0.1, Snow: 0.1 },
      Rain: { Cloudy: 0.2, Sunny: 0.1, Rain: 0.6, Snow: 0.1 },
      Snow: { Cloudy: 0.1, Sunny: 0.1, Rain: 0.1, Snow: 0.7 },
    };

    // Start from a random state
    let currentState = states[Math.floor(Math.random() * states.length)];

    // Predict the weather for the given time units
    let day = 1;
    let time = 0;
    let forecast = [];
    while (day <= timeUnits) {
      let timeInCurrentState = -Math.log(Math.random()); // Exponential random variable
      time += timeInCurrentState;

      while (time >= day) {
        currentState = predictNextState(currentState, transitionMatrix);
        forecast.push({
          day: day,
          state: currentState,
        });
        day++;
        if (day > timeUnits) {
          break;
        }
      }

      if (day > timeUnits) {
        break;
      }
    }

    setForcast(forecast);
  }

  function predictNextState(currentState, transitionMatrix) {
    let weights = transitionMatrix[currentState];
    let states = Object.keys(weights);

    // Generate a random number between 0 and 1
    let randomNum = Math.random();

    let cumulativeProbability = 0.0;
    for (let i = 0; i < states.length; i++) {
      cumulativeProbability += weights[states[i]];
      if (randomNum < cumulativeProbability) {
        return states[i];
      }
    }
  }

  // Call the function
  return (
    <div className="container-main">
      <div className="box-container">
        <div className="control-container">
          <div className="title">
            WEATHER PREDICTION USING{' '}
            <span style={{ color: 'rgb(90, 147, 221)' }}>MARKOV CHAIN</span>{' '}
            🔗‍💥
          </div>
          <div className="days-container">
            <input
              className="days-input"
              type="number"
              max={15}
              min={5}
              value={days}
              placeholder="Days"
              onChange={(event) => {
                let value = parseInt(event.target.value);
                setDays(value);
              }}
            />
          </div>
          <div className="predict-container">
            <button
              className={
                days >= 5 && days <= 15
                  ? 'predict-button'
                  : 'predict-button-inactive'
              }
              onClick={() => {
                days >= 5 && days <= 15 && predictWeather(days);
              }}
            >
              Predict
            </button>
          </div>
        </div>
        <div className="card-container">
          {forcast.length > 0 &&
            forcast.map((d, index) => {
              return <Card key={index} name={d.state} day={d.day} />;
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
