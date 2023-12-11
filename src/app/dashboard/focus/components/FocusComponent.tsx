"use client"

import React, { useState, useEffect, ChangeEvent } from "react";
import toast from "react-hot-toast";

interface FocusPageProps {}

interface Task {
  text: string;
  time: number;
  unit: string; // "hour", "minute", "second"
  completed: boolean;
}

interface FocusPageState {
  currentImageIndex: number;
  tasks: Task[];
  newTask: string;
  newTaskTime: number;
  newTaskUnit: string;
  editTaskIndex: number | null;
  runningTaskIndex: number | null;
  timer: number;
}

const FocusPage: React.FC<FocusPageProps> = () => {
  const images: string[] = [
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1701703755/wallpaper4_jgoocs.png",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1701703755/wallpaper3_vsmmzo.png",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1701703754/walpppaer2_gibqye.png",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1701703753/wallapper1_lvz6ww.png",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1702070574/Create_a_high_resolution_artwork_of_lofi_1_k3sd9a.jpg",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1702070574/wallaperOfice_qg2bii.jpg",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1702070574/girldWallpaper_lmjbjt.jpg",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1702070574/wallpaper_Boy_alone_in_the_room_nyxwfl.jpg",
    "https://res.cloudinary.com/dewtlb5rq/image/upload/v1702070573/boywall_cnssw5.jpg",
  ];

  const initialTime = 60; // Initial time for each task in seconds

  const [state, setState] = useState<FocusPageState>({
    currentImageIndex: 0,
    tasks: [],
    newTask: "",
    newTaskTime: initialTime,
    newTaskUnit: "second",
    editTaskIndex: null,
    runningTaskIndex: null,
    timer: initialTime,
  });

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (state.timer > 0 && state.runningTaskIndex !== null) {
      interval = setInterval(() => {
        setState((prevState) => ({
          ...prevState,
          timer: prevState.timer - 1,
        }));
      }, 1000);
    } else if (state.timer === 0 && state.runningTaskIndex !== null) {
      handleTaskCompletion();
    }

    return () => clearInterval(interval);
  }, [state.timer, state.runningTaskIndex, state.tasks]);

  const handleTaskCompletion = (): void => {
    toast.success("Tiempo para terminar la tarea culminado");
    const updatedTasks: Task[] = [...state.tasks];
    updatedTasks[state.runningTaskIndex!] = {
      ...updatedTasks[state.runningTaskIndex!],
      completed: true,
    };

    const nextImageIndex = (state.currentImageIndex + 1) % images.length;

    setState((prevState) => ({
      ...prevState,
      tasks: updatedTasks,
      runningTaskIndex: null,
      timer: initialTime,
      currentImageIndex: nextImageIndex,
    }));
  };

  const handleNextImage = (): void => {
    const newIndex: number = (state.currentImageIndex + 1) % images.length;
    setState((prevState) => ({ ...prevState, currentImageIndex: newIndex }));
  };

  const handlePrevImage = (): void => {
    const newIndex: number =
      (state.currentImageIndex - 1 + images.length) % images.length;
    setState((prevState) => ({ ...prevState, currentImageIndex: newIndex }));
  };

  const handleAddTask = (): void => {
    if (state.newTask.trim() !== "") {
      const timeInSeconds =
        state.newTaskUnit === "hour"
          ? state.newTaskTime * 3600
          : state.newTaskUnit === "minute"
          ? state.newTaskTime * 60
          : state.newTaskTime;
      toast.success("Tarea agregada correctamente");

      const newTask: Task = {
        text: state.newTask.trim(),
        time: timeInSeconds,
        unit: state.newTaskUnit,
        completed: false,
      };

      const updatedTasks: Task[] = [...state.tasks, newTask];
      setState((prevState) => ({
        ...prevState,
        tasks: updatedTasks,
        newTask: "",
        newTaskTime: initialTime,
        newTaskUnit: "second",
        runningTaskIndex: null,
        timer: timeInSeconds,
      }));
    }
  };

  const handleEditTask = (index: number): void => {
    const { text, time, unit } = state.tasks[index];
    setState((prevState) => ({
      ...prevState,
      newTask: text,
      newTaskTime: time,
      newTaskUnit: unit,
      editTaskIndex: index,
      runningTaskIndex: null,
      timer: time,
    }));
  };

  const handleStartTask = (): void => {
    if (state.tasks.length === 0) {
      toast.error("No tienes tareas por completar");
    } else if (state.runningTaskIndex === null && state.timer > 0) {
      setState((prevState) => ({
        ...prevState,
        runningTaskIndex:
          state.editTaskIndex !== null
            ? state.editTaskIndex
            : state.tasks.length - 1,
      }));
    } else {
      toast.error("La tare ya esta en proceso");
    }
  };

  const handleUpdateTask = (): void => {
    if (state.newTask.trim() !== "") {
      const timeInSeconds =
        state.newTaskUnit === "hour"
          ? state.newTaskTime * 3600
          : state.newTaskUnit === "minute"
          ? state.newTaskTime * 60
          : state.newTaskTime;
      toast.success("Tarea actualizada correctamente");

      const updatedTasks: Task[] = [...state.tasks];
      updatedTasks[state.editTaskIndex!] = {
        text: state.newTask.trim(),
        time: timeInSeconds,
        unit: state.newTaskUnit,
        completed: false,
      };

      setState((prevState) => ({
        ...prevState,
        tasks: updatedTasks,
        newTask: "",
        newTaskTime: initialTime,
        newTaskUnit: "second",
        editTaskIndex: null,
        runningTaskIndex: null,
        timer: timeInSeconds,
      }));
    }
  };

  const handleDeleteTask = (index: number): void => {
    const updatedTasks: Task[] = state.tasks.filter((_, i) => i !== index);
    setState((prevState) => ({ ...prevState, tasks: updatedTasks }));
    toast.success("Tarea Eliminada Correctamente 👍🗑");
  };

  const handleNewTaskChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    setState((prevState) => ({ ...prevState, newTask: value }));
  };

  const handleNewTaskTimeChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { value } = e.target;
    const time = parseInt(value, 10);
    setState((prevState) => ({ ...prevState, newTaskTime: time }));
  };

  const handleNewTaskUnitChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    const { value } = e.target;
    setState((prevState) => ({ ...prevState, newTaskUnit: value }));
  };

  const formatTime = (time: number): string => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;

    const formattedHours = hours > 0 ? `${hours}:` : "";
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

    return `${formattedHours}${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="max-w-screen-md mx-auto p-4">
      {/* Imagen actual */}
      <img
        src={images[state.currentImageIndex]}
        alt={`Landscape picture ${state.currentImageIndex + 1}`}
        className="w-full relative z-0"
      />

      <div className="relative z-10 mt-4">
        <h2 className="text-xl font-bold mb-2">Tareas</h2>
        <ul>
          {state.tasks.map((task, index) => (
            <li
              key={index}
              className={`flex items-center justify-between p-2 border-b ${
                task.completed ? "line-through" : ""
              }`}
            >
              <div>
                <span>{task.text}</span> - Tiempo restante:{" "}
                {formatTime(task.time)}
              </div>
              <div className="flex items-center">
                <button
                  onClick={() => handleEditTask(index)}
                  className="text-blue-500 hover:underline mr-2 transition duration-300 ease-in-out"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDeleteTask(index)}
                  className="text-red-500 hover:underline transition duration-300 ease-in-out"
                >
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-2">
          <input
            type="text"
            value={state.newTask}
            onChange={handleNewTaskChange}
            className="border p-2 mr-2"
            placeholder="Nueva tarea"
          />
          <input
            type="number"
            value={state.newTaskTime}
            onChange={handleNewTaskTimeChange}
            className="border p-2 mr-2"
            placeholder="Tiempo"
          />
          <select
            value={state.newTaskUnit}
            onChange={handleNewTaskUnitChange}
            className="border p-2 mr-2"
          >
            <option value="hour">Horas</option>
            <option value="minute">Minutos</option>
            <option value="second">Segundos</option>
          </select>
          {state.editTaskIndex !== null ? (
            <button
              onClick={handleUpdateTask}
              className="bg-blue-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
            >
              Actualizar Tarea
            </button>
          ) : (
            <button
              onClick={handleAddTask}
              className="bg-green-500 text-white px-4 py-2 rounded transition duration-300 ease-in-out"
            >
              Agregar Tarea
            </button>
          )}
          {state.tasks.length > 0 && (
            <button
              onClick={handleStartTask}
              className="bg-green-500 text-white px-4 py-2 ml-2 rounded transition duration-300 ease-in-out"
            >
              Iniciar Tarea
            </button>
          )}
        </div>
      </div>

      {/* Timer */}
      {state.runningTaskIndex !== null && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Temporizador</h2>
          <div className="flex items-center space-x-4">
            <div className="bg-gray-800 text-white p-4 rounded-full shadow-lg">
              <span className="text-2xl">{formatTime(state.timer)}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-600">Tiempo restante</span>
              <span className="text-lg font-bold">
                {formatTime(state.timer)}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FocusPage;
