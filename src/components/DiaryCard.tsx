"use client";

import { CldImage } from "next-cloudinary";
import imageDefault from "@/../public/assets/imageDefault.svg";
import { Diary } from "@prisma/client";

const DiaryCard = ({ diary }: { diary: Diary }) => {
  const diaryImage = diary.image || imageDefault;
  const maxContentLength = 10;
 
  return (
    <div
      key={diary.id}
      className="relative hover:cursor-pointer rounded-xl my-2 flex justify-between overflow-hidden transition duration-300 ease-in-out hover:scale-105"
    >
      <CldImage
        className="max-h-[100px] rounded-xl object-cover h-auto "
        width={200}
        height={100}
        sizes="50vw"
        src={diaryImage}
        alt={diary.content}
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-right font-semibold">
        <p className="text-xs">
          {new Date(diary.createAt).toLocaleDateString()}
        </p>
        <p className="text-lg">
          {diary.content.length > maxContentLength
            ? diary.content.slice(0, maxContentLength) + '...'
            : diary.content}
        </p>
        <p className="text-[0.70rem]">{diary.mood}</p>
      </div>
    </div>
  );
};

export default DiaryCard;
