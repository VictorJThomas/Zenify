import React, { useState, useEffect } from "react";

const ClockComponent = () => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [amPm, setAmPm] = useState("AM");

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = new Date();
      let currentHours = now.getHours();
      const currentAmPm = currentHours >= 12 ? "PM" : "AM";
      currentHours = currentHours % 12 || 12;

      setHours(currentHours);
      setMinutes(now.getMinutes());
      setSeconds(now.getSeconds());
      setAmPm(currentAmPm);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <section className="flex justify-center items-center h-screen relative bg-gradient-to-tr dark:text-white from-[#EDA982] dark:from-[#BB8768] from-5% via-[#F9F4ED] dark:via-[#8C7A69] via-50% to-[#EF9A80] dark:to-[#CC856F] to-100%">
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {String(hours).padStart(2, "0")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Horas</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {String(minutes).padStart(2, "0")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">Minutos</p>
          </div>
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-md shadow-lg">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
              {String(seconds).padStart(2, "0")}
            </h2>
            <p className="text-gray-500 dark:text-gray-400">{amPm}</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ClockComponent;
