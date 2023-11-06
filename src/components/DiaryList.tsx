import { Diary } from "@prisma/client";
import { useContext, useEffect } from "react";
import { HiTrash, HiPencil } from "react-icons/hi";
import Image from "next/image"
import imageDefault from "@/../public/assets/imageDefault.svg"
import { CldImage } from "next-cloudinary";

function DiaryList({ diary }: { diary: Diary }) {

  console.log(diary)
  const diaryImage = diary.image || imageDefault

  return (
    <div>
      <div key={diary.id} className="bg-slate-300 p-4 my-2 flex justify-between">
        <div>
        <CldImage
          width="960"
          height="600"
          src={diaryImage}
          sizes="100vw"
          alt="Description of my image"
        />
          <p>{diary.content}</p>
          <p>{new Date(diary.createAt).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default DiaryList;
