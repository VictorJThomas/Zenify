"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { useLocalStorage } from "../hooks/useLocalStorage";

const GoalContext = createContext({
    goals: [],
    createGoal: (goalTitle : string, goalDescription: string, goalTime: string, createAt: string, updateAt: string, status: GoalStatus.PROCESS, userId: any) => {},
    updateGoal: (id: string, updatedGoal: any) => {},
    deleteGoal: (id: string) => {},
  });

enum GoalStatus {
    PROCESS,
    FAILED,
    SUCCESS
  }

export const useGoals = () => {
  const context = useContext(GoalContext);
  if (!context) throw new Error("useGoals must be used within a GoalProvider");
  return context;
};

export const GoalProvider = ({ children }: { children: any}) => {
  // save in localStorage
  const [goals, setGoals] = useLocalStorage("goals", []);

  const createGoal = (goalTitle: string, goalDescription: string, goalTime: string, createAt: string, updateAt: string, status: GoalStatus.PROCESS, userId: any ) =>
  setGoals([...goals, { id: uuid(), goalTitle, goalDescription, goalTime, createAt, updateAt, status, userId }]);

  const updateGoal = (id: string, updatedGoal: any) =>
    setGoals([
      ...goals.map((goal: any) =>
        goal.id === id ? { ...goal, ...updatedGoal } : goal
      ),
    ]);

  const deleteGoal = (id: string) =>
    setGoals([...goals.filter((goal: any) => goal.id !== id)]);

  return (
    <GoalContext.Provider
      value={{
        goals,
        createGoal,
        updateGoal,
        deleteGoal,
      }}
    >
      {children}
    </GoalContext.Provider>
  );
};