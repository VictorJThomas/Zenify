"use client";

import { AiOutlinePlusSquare } from "react-icons/ai";
import { useEffect } from "react";
import { useState } from "react";
import DiaryForm from "./DiaryForm";
import axios from "axios";

type DiaryType = {
  id: string;
  createAt: Date;
  updateAt: Date;
  image: string | null;
  content: string;
  userId: string;
};

function RightPanel() {
  const [diaries, setDiaries] = useState<DiaryType[]>([]);

  async function loadDiaries() {
    try{
      const res = await axios.get("/api/diary");
      console.log(res)

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
  }, []);

  return (
    <aside className="w-[290px] py-[25px] px-[20px] flex-col justify-between items-center self-stretch flex-shrink-0  bg-zinc-50 rounded-xl">
      <div className="flex flex-2 gap-4 m-4 justify-center">
        <div className="font-semibold text-xl pt-2">Diary</div>
        <div className="">
          <button
            className="rounded-full bg-zinc-300 p-3 text-xs font-medium uppercase leading-normal text-white shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] transition duration-150 ease-in-out hover:bg-primary-700 focus:bg-primary-700 focus:outline-none focus:ring-0 active:bg-primary-800"
            data-te-toggle="modal"
            data-te-target="#exampleModalWithIcon"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <AiOutlinePlusSquare size="30" />
          </button>
        </div>
        <DiaryForm />
      </div>
    </aside>
  );
}

export default RightPanel;
