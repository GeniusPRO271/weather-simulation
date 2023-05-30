import React from 'react';
import '../App.css';

function Card({ name, day }) {
  function pickIcon(weatherState) {
    // Define the mapping of states to emojis
    const states = {
      Cloudy: '☁️',
      Sunny: '☀️',
      Rain: '🌧️',
      Snow: '❄️',
    };

    // Return the corresponding emoji, or a default emoji if the state is not recognized
    return states[weatherState] || '❓';
  }
  return (
    <div className="climate-card">
      <div style={{ fontWeight: 'bold' }}>Day {day}</div>
      <div>
        <div className="icon">{pickIcon(name)}</div>
      </div>
      <div>{name}</div>
    </div>
  );
}

export default Card;
