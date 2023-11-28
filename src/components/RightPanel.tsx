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

const RightPanel = () => {
  const [diaries, setDiaries] = useState<DiaryType[]>([]);
  const [selectedDiary, setSelectedDiary] = useState<Diary | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);

  const adaptDiaryData = (data: any) => {
    return {
      id: data.id,
      createAt: new Date(data.createAt),
      updateAt: new Date(data.updateAt),
      image: data.image,
      content: data.content,
      userId: data.userId,
      mood: data.mood,
    };
  };


  const loadDiaries = async () => {
    try {
      const res = await axios.get('/api/diary');
      console.log(res.data.diaries)
      const adaptedData = res.data.diaries.map((item: any) => adaptDiaryData(item));
      setDiaries(adaptedData);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadDiaries()
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple });
    };
    init();
  }, []);

  const handleCardClick = (diary: Diary) => {
    setSelectedDiary(diary);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedDiary(null);
    setIsModalOpen(false);
  };

  const handleDiaryCreated = () => {
    loadDiaries();
  };

  const openFormModal = () => {
    setIsFormModalOpen(true);
  };

  return (
    <aside className="sticky top-0 right-0 w-[290px] bg-slate-100 dark:bg-[#28231E] dark:bg-opacity-30 bg-opacity-30 h-screen py-[25px] px-[20px] flex-col justify-between items-center self-stretch flex-shrink-0  rounded-l-xl">
      <div className="flex flex-2 gap-4 m-4 justify-center">
        <div className="font-semibold text-xl pt-2">Diary</div>
        <div className="">
          <button
            className="rounded-full bg-zinc-300 bg-opacity-40 p-3 text-xs font-medium uppercase leading-normal text-black shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] transition duration-150 ease-in-out hover:text-white focus:text-white active:text-white hover:bg-zinc-600 focus:bg-zinc-600 focus:outline-none focus:ring-0 active:bg-zinc-800"
            onClick={openFormModal}
          >
            <AiOutlinePlusSquare size="30" />
          </button>
        </div>
        <DiaryForm isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} onDiaryCreated={handleDiaryCreated}/>
      </div>
      <div className="overflow-y-scroll max-h-[700px] scroll-smooth focus:scroll-auto snap-mandatory snap-y p-4">
        {diaries.map((diary) => (
          <DiaryList
            key={diary.id}
            diary={diary}
            onCardClick={() => handleCardClick(diary)}
          />
        ))}
      </div>
      <DiaryView
        isOpen={isModalOpen}
        onClose={closeModal}
        diary={selectedDiary}
      />
    </aside>
  );
};

export default RightPanel;
