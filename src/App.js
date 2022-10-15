import { useEffect, useState, useRef } from "react";
import "./styles.css";

const secondsToHHMMSS = (seconds) => {
  if (seconds < 3600)
    return new Date(seconds * 1000).toISOString().substr(14, 5);

  return new Date(seconds * 1000).toISOString().substr(11, 8);
};

export default function App() {
  const timerRef = useRef();
  const inputRef = useRef();

  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => prev - 1);
    }, 1000);
  };
  const stopTimer = () => {
    clearInterval(setCurrentTime(0));
  };

  const pouseTimer = () => {
    clearInterval(timerRef.current);
  };

  const resumeTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentTime((prev) => {
        if (prev >= inputRef.current.value) {
          return inputRef.current.value;
        }
        return prev + 1;
      });
    }, 1000);
  };

  useEffect(() => {
    if (currentTime === 0) {
      clearInterval(timerRef.current);
    }
  }, [currentTime]);

  const handleStart = (e) => {
    e.preventDefault();
    const secondsInput = inputRef.current.value;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    if (timerRef.current === inputRef.current.value) return;
    setCurrentTime(() => secondsInput);
    if (secondsInput) {
      startTimer();
    } else {
      alert("set the timer");
    }
  };

  const handleStop = (e) => {
    e.preventDefault();

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    const secondsInput = inputRef.current.value;

    setCurrentTime(() => secondsInput);

    stopTimer();
  };

  const handlePouse = () => {
    pouseTimer();
  };
  const handleResume = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    resumeTimer();
  };

  return (
    <div className="App">
      <input
        type="number"
        placeholder="Enter total seconds to countdown"
        ref={inputRef}
      />

      <div className="wrapper">
        <button onClick={handleStart}>Start</button>
        <button onClick={handlePouse}>Pouse</button>
        <button onClick={handleResume}>Continue</button>
        <button onClick={handleStop}>Reset</button>
      </div>
      <div className="time">{secondsToHHMMSS(currentTime)}</div>
    </div>
  );
}
