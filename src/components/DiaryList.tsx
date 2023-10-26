"use client"

import { Diary } from "@prisma/client";
import {DiaryContext} from "@/context/DiaryContext"
import { useContext, useEffect } from "react"
import {HiTrash, HiPencil} from 'react-icons/hi'

async function DiaryList({ diary }: { diary: Diary }) {
    const {diaries, loadDiaries} = useContext(DiaryContext)
    return (
            <div key={diary.id} className="bg-slate-300 p-4 my-2 flex justify-between">
                <div>
                <image className="text-2xl font-bold">{diary.image}</image>
                <p>{diary.content}</p>
                <p>{new Date(diary.createAt).toLocaleDateString()}</p>
                </div>
            </div>
        );
    };

export default DiaryList;