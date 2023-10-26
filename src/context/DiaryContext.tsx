"use client";

import { createContext, useState } from "react";

interface Diary {
    image: String;
    content: string;
}

export const DiaryContext = createContext<{
    diaries: any[],
    loadDiaries: () => Promise<void>;
    createDiary: (diary: Diary) => Promise<void>;
}>({
    diaries: [],
    loadDiaries: async () => {},
    createDiary: async (diary: Diary) => {},
});

export const DiaryProvider = ({ children } : {children: React.ReactNode}) => {

    const [diaries, setDiaries] = useState([]);

    async function loadDiaries() {
        const res = await fetch("api/diary")
        const data = await res.json();
        setDiaries(data);
    }

    async function createDiary(diary: Diary) {
        const res = await fetch("api/diary", {
            method: "POST",
            body: JSON.stringify(diary),
            headers: {
                "Content-Type": "application/json",
            },
        });
        const newDiary = await res.json();
        setDiaries([diaries, newDiary]);
    }

    return (
        <DiaryContext.Provider value={{diaries, loadDiaries, createDiary}}>
            {children}
        </DiaryContext.Provider>
    );
};