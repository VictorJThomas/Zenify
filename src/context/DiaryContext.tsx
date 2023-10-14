"use client";

import { Diary } from "@prisma/client";
import { createContext, useState, useContext } from "react";

export const DiaryContext = createContext<{ 
    diary: Diary[];
    loadDiary: () => Promise<void>;
}>({
    diary: [],
    loadDiary: async() => {} 
});

export const useDiary = () => {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error("useDiary must be used within a DiaryProvider");
  }
  return context;
};

export const DiaryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
    const [diary, setDiary] = useState<Diary[]>([]);
    // const [selectedDiary, setSelectedDiary] = useDiary<Diary | null>(null)

    async function loadDiary() {
        const res = await fetch("/api/diary")
        const data = await res.json();
        setDiary(data)
    }

    return (
        <DiaryContext
            value={{
                diary,
                loadDiary
            }}
        >
            {children}
        </DiaryContext>
    )
};
