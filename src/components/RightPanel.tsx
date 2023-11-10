"use client";

import { AiOutlinePlusSquare } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import DiaryForm from "./DiaryForm";
import axios from "axios";
import DiaryList from "./DiaryList";
import { Diary } from "@prisma/client";
import DiaryView from "./DiaryView";

type DiaryType = {
  id: string;
  createAt: Date;
  updateAt: Date;
  image: string | null;
  content: string;
  userId: string;
  mood: string;
};

function RightPanel() {
  const [diaries, setDiaries] = useState<DiaryType[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const adaptDiaryData = (data:any) => {
    return {
      id: data.id,
      createAt: new Date(data.createAt),
      updateAt: new Date(data.updateAt),
      image: data.image,
      content: data.content,
      userId: data.userId,
      mood: data.mood
    }
  }

  async function loadDiaries() {
    try{
      const res = await axios.get("/api/diary");
      const adaptedData = res.data.map((item: any) => adaptDiaryData(item));
      setDiaries(adaptedData)
    } catch (e){
      console.log(e);
    }
  }

  useEffect(() => {
    loadDiaries();
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple });
    };
    init();
  });

  const handleCardClick = (diary: Diary) => {
    setSelectedDiary(diary);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDiary(null);
    setIsModalOpen(false);
  };

  return (
    <aside className="w-[290px] py-[25px] px-[20px] flex-col justify-between items-center self-stretch flex-shrink-0  bg-zinc-50 rounded-xl">
      <div className="flex flex-2 gap-4 m-4 justify-center">
        <div className="font-semibold text-xl pt-2">Diary</div>
        <div className="">
          <button
            className="rounded-full bg-zinc-300 p-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] transition duration-150 ease-in-out hover:bg-primary-700 focus:bg-primary-700 focus:outline-none focus:ring-0 active:bg-primary-800"
            data-te-toggle="modal"
            data-te-target="#diaryform"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <AiOutlinePlusSquare size="30" />
          </button>
        </div>
        <DiaryForm />
      </div>
      <div className="overflow-y-scroll max-h-[700px] scroll-smooth focus:scroll-auto snap-mandatory snap-y p-4">
          {diaries.map((diary) => (
            <DiaryList key={diary.id} diary={diary} onCardClick={() => handleCardClick(diary)}/>
          ))}
      </div>
      <DiaryView isOpen={isModalOpen} onClose={closeModal} diary={selectedDiary}/>
    </aside>
  );
}

export default RightPanel;
