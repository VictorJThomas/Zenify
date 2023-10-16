"use client"


import { AiOutlinePlusSquare } from "react-icons/ai";

const RightPanel = () => {



  return (
    <aside className="p-4 basis-1/2 max-w-[40vh] bg-zinc-50 h-[calc(90vh)] rounded-xl">
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
