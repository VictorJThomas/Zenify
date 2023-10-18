"use client"


import { AiOutlinePlusSquare } from "react-icons/ai";

const RightPanel = () => {
  return (
    <aside className="w-[290px] py-[25px] px-[20px] flex-col justify-between items-center self-stretch flex-shrink-0  bg-zinc-50 rounded-xl">
      <div className="flex flex-2 gap-4 m-4 justify-center">
        <div className="font-semibold text-xl">Diary</div>
        <div className="cursor-pointer overflow-hidden rounded-lg bg-zinc-200 shadow hover:bg-zinc-300 hover:scale-105">
          <div className="">
            <AiOutlinePlusSquare size="30" />
          </div>
        </div>
      </div>
      <div>
      </div>
    </aside>
  );
};

export default RightPanel;
