import { Diary } from "@prisma/client";
import { useContext, useEffect } from "react";
import { HiTrash, HiPencil } from "react-icons/hi";

type DiaryType = {
  id: string;
  createAt: Date;
  updateAt: Date;
  image: string | null;
  content: string;
  userId: string;
};

function DiaryList({ diary }: { diary: DiaryType }) {
  return (
    <div key={diary.id} className="bg-slate-300 p-4 my-2 flex justify-between">
      <div>
        <image className="text-2xl font-bold">{diary.image}</image>
        <p>{diary.content}</p>
        <p>{new Date(diary.createAt).toLocaleDateString()}</p>
      </div>
    </div>
  );
}

export default DiaryList;
