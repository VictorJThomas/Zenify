"use client"

import { AiOutlinePlusSquare } from "react-icons/ai";
import { useContext, useEffect } from "react"
import DiaryCard from "./DiaryCard";
import DiaryF from "./DiaryForm"
import { useState } from "react"
import DiaryForm from "./DiaryForm";
import DiaryList from "./DiaryList";

type DiaryType = {
  id: string;
  createAt: Date;
  updateAt: Date;
  image: string | null;
  content: string;
  userId: string;
}

function RightPanel(){
  const [diaries, setDiaries] = useState<DiaryType[]>([]);

  async function loadDiaries() {
    const res = await fetch("api/diary")
    const data = await res.json();
    setDiaries(data);
  }
  useEffect(() => {
    loadDiaries();
  }, []);
  return (
      <aside className="w-[290px] py-[25px] px-[20px] flex-col justify-between items-center self-stretch flex-shrink-0  bg-zinc-50 rounded-xl">
        <div className="flex flex-2 gap-4 m-4 justify-center">
          <div className="font-semibold text-xl">Diary</div>
          <div className="cursor-pointer overflow-hidden rounded-lg bg-zinc-200 shadow hover:bg-zinc-300 hover:scale-105">
            <div className="">
              <AiOutlinePlusSquare size="30"/>
              <DiaryForm/>
            </div>
          </div>
        </div>
        <div>
          {diaries.map((diary) => (
              <DiaryList key={diary.id} diary={diary}/>
          ))}
        </div>
      </aside>
    );
}

export default RightPanel;
