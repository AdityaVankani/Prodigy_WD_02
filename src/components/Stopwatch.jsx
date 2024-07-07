import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [countdownTime, setCountdownTime] = useState(0);
  const [countdownRunning, setCountdownRunning] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const timerRef = useRef(null);
  const countdownRef = useRef(null);

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => {
        setTime(prevTime => prevTime + 10);
      }, 10);
    } else {
      clearInterval(timerRef.current);
    }
    return () => clearInterval(timerRef.current);
  }, [running]);

  useEffect(() => {
    if (countdownRunning) {
        countdownRef.current = setInterval(() => {
          setCountdownTime(prevTime => {
            if (prevTime > 0) {
              return prevTime - 10;
            } else {
              clearInterval(countdownRef.current);
              setCountdownRunning(false);
              alert("Time's up!");
              return 0;
            }
          });
        }, 10);
      } else {
        
      clearInterval(countdownRef.current);
    }
    return () => clearInterval(countdownRef.current);
  }, [countdownRunning]);

  useEffect(() => {
    const clockInterval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(clockInterval);
  }, []);

  const startStopwatch = () => setRunning(true);
  const pauseStopwatch = () => setRunning(false);
  const resetStopwatch = () => {
    setRunning(false);
    setTime(0);
    setLaps([]);
  };
  const addLap = () => setLaps([...laps, time]);

  const startCountdown = () => {
    setCountdownTime((hours * 3600 + minutes * 60 + seconds) * 1000);
    
    setCountdownRunning(true);
  };
  const pauseCountdown = () => setCountdownRunning(false);
  const resetCountdown = () => {
    setCountdownRunning(false);
    setCountdownTime(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (time) => {
    const getMilliseconds = `0${(time % 1000) / 10}`.slice(-2);
    const getSeconds = `0${Math.floor((time / 1000) % 60)}`.slice(-2);
    const getMinutes = `0${Math.floor((time / 60000) % 60)}`.slice(-2);
    const getHours = `0${Math.floor(time / 3600000)}`.slice(-2);
    return `${getHours}:${getMinutes}:${getSeconds}:${getMilliseconds}`;
  };

  return (
    <>
    <div className=" flex justify-left text-white bg-gray-900 pt-5 sticky top-0">
        <h2 className="text-3xl ">Current Time: {currentTime.toLocaleTimeString()}</h2>
    </div>
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white font-mono ">
        <h1 className="text-5xl mb-10">ChronoTrack</h1>
      
      
      <div className="text-4xl mb-6">{formatTime(time)}</div>
      <div className="flex space-x-4 mb-6">
        <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600" onClick={startStopwatch}>Start</button>
        <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600" onClick={pauseStopwatch}>Pause</button>
        <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600" onClick={resetStopwatch}>Reset</button>
        <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600" onClick={addLap}>Lap</button>
      </div>
      
      <ul className="list-none p-0 mb-10 text-wrap overflow-y-scroll max-h-48 w-fit">
        {laps.map((lap, index) => (
          <li key={index} className="mb-1">Lap {index + 1}: {formatTime(lap)}</li>
        ))}
      </ul>
      <div className="flex flex-col items-center mb-11 bg-slate-700 rounded-xl p-3">
        <h1 className='text-2xl mb-6 font-semibold'>Countdown</h1>
        <div className="text-4xl mb-10">{formatTime(countdownTime)}</div>
        <div className="flex space-x-2 mb-10">
          <input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(parseInt(e.target.value) )}
            className="px-2 py-1 text-black rounded-md w-36"
          />
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(parseInt(e.target.value))}
            className="px-2 py-1 text-black rounded-md w-36"
          />
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(parseInt(e.target.value) )}
            className="px-2 py-1 text-black rounded-md w-36"
          />
        </div>
        <div className="flex space-x-4">
          <button className="px-4 py-2 bg-gray-900 rounded hover:bg-gray-600" onClick={startCountdown}>Start</button>
          <button className="px-4 py-2 bg-gray-900 rounded hover:bg-gray-600" onClick={pauseCountdown}>Pause</button>
          <button className="px-4 py-2 bg-gray-900 rounded hover:bg-gray-600" onClick={resetCountdown}>Reset</button>
        </div>
      </div>
    </div>
    </>
  );
};

export default Stopwatch;
