import React, { useState, useEffect } from 'react';
import "./Main.css";

function Main() {
  const initialTimezones = [
    { name: 'Nova Iorque', offset: -2 },
    { name: 'Londres', offset: +3 },
    { name: 'Paris', offset: +4 },
    { name: 'Tóquio', offset: +12 },
    { name: 'Sydney', offset: +14 }
  ];

  const [timezones, setTimezones] = useState(initialTimezones);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [newTimezoneName, setNewTimezoneName] = useState('');
  const [newTimezoneOffset, setNewTimezoneOffset] = useState(0);

  const addTimezone = () => {
    setTimezones([
      timezones,
      { name: newTimezoneName, offset: parseInt(newTimezoneOffset) }
    ]);
    setNewTimezoneName('');
    setNewTimezoneOffset(0);
  };

  const formatTime = (time) => {
    return time.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  };

  const calculateTime = (offset) => {
    const newTime = new Date(currentTime.getTime() + offset * 3600 * 1000);
    return formatTime(newTime);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, [currentTime]);

  return (
    <main>
      <div>
        {timezones.map((timezone, index) => (
          <p key={index}>
            {timezone.name}: {calculateTime(timezone.offset)}
          </p>
        ))}
      </div>
      <div>
        <h2>Adicionar Fuso Horário</h2>
        <input
          type="text"
          placeholder="Nome do fuso horário"
          value={newTimezoneName}
          onChange={(e) => setNewTimezoneName(e.target.value)}
        />
        <input
          type="number"
          placeholder="Offset em relação ao UTC"
          value={newTimezoneOffset}
          onChange={(e) => setNewTimezoneOffset(e.target.value)}
        />
        <button onClick={addTimezone}>Adicionar</button>
      </div>
    </main>
  );
}

export default Main;