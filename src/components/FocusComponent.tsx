import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
const FocusComponent = () => {
  const [seconds, setSeconds] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [durationValue, setDurationValue] = useState(0);
  const [durationUnit, setDurationUnit] = useState("seconds");

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    if (isRunning) {
      intervalId = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prevSeconds) => prevSeconds - 1);
        } else if (minutes > 0) {
          setSeconds(59);
          setMinutes((prevMinutes) => prevMinutes - 1);
        } else if (hours > 0) {
          setSeconds(59);
          setMinutes(59);
          setHours((prevHours) => prevHours - 1);
        } else {
          setIsRunning(false);
          toast.success("Tiempo Terminado");
          clearInterval(intervalId);
        }
      }, 1000);
    }

    return () => clearInterval(intervalId);
  }, [isRunning, seconds, minutes, hours]);

  const handleStart = () => {
    if (!isRunning && durationValue > 0) {
      initializeTimer();
      setIsRunning(true);
      {
        toast("Focus Start", {
          icon: "⌛",
        });
      }
    }
  };

  const handlePause = () => {
    setIsRunning(false);
    toast("paused time", {
      icon: "⏸",
    });
  };

  const handleReset = () => {
    setIsRunning(false);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
    toast("reset time", {
      icon: "⏳",
    });
  };

  const initializeTimer = () => {
    switch (durationUnit) {
      case "hours":
        setHours(durationValue);
        setMinutes(0);
        setSeconds(0);
        break;
      case "minutes":
        setHours(0);
        setMinutes(durationValue);
        setSeconds(0);
        break;
      default:
        setHours(0);
        setMinutes(0);
        setSeconds(durationValue);
        break;
    }
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setDurationValue(isNaN(value) ? 0 : value);
  };

  const handleDurationUnitChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDurationUnit(e.target.value);
  };

  return (
    <div>
      <section className="flex justify-center items-center h-screen bg-gray-100 dark:bg-gray-900">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {String(hours).padStart(2, "0")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Hours</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {String(minutes).padStart(2, "0")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Minutes</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {String(seconds).padStart(2, "0")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Seconds</p>
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center">
          <label className="mb-2">
            Duración:
            <input
              type="number"
              value={durationValue}
              onChange={handleDurationChange}
              min="1"
              className="ml-2 p-2 border rounded"
            />
          </label>
          <select
            value={durationUnit}
            onChange={handleDurationUnitChange}
            className="mb-2 p-2 border rounded"
          >
            <option value="seconds">Segundos</option>
            <option value="minutes">Minutos</option>
            <option value="hours">Horas</option>
          </select>
          <br />
          <button onClick={handleStart} disabled={isRunning} className="btn">
            Iniciar
          </button>
          <button onClick={handlePause} disabled={!isRunning} className="btn">
            Pausar
          </button>
          <button onClick={handleReset} className="btn">
            Reiniciar
          </button>
        </div>
      </section>
    </div>
  );
};

export default FocusComponent;
