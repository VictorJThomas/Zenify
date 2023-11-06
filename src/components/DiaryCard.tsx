"use client";

import { CldImage } from "next-cloudinary";
import Image from "next/image";
import imageDefault from "@/../public/assets/imageDefault.svg";
import { Tilt } from "react-tilt";
import { Diary } from "@prisma/client";

const defaultOptons = {
  reverse: false,
  max: 20,
//   perspective: 1000,
  scale: 1,
  speed: 500,
  transition: true,
  axis: null,
  reset: true,
  easing: "cubic-bezier(0.3,.98,.52,.99)",
};

const DiaryCard = ({ diary }: { diary: Diary }) => {
  const diaryImage = diary.image || imageDefault;
  return (
    <Tilt options={defaultOptons}>
      <div
        key={diary.id}
        className="bg-zinc-200 my-2 rounded-lg flex justify-between"
      >
        <div className="flex">
          <CldImage
            className="rounded-lg max-h-[120px]"
            width={200}
            height={10} 
            strictTransformations
            // transformations={}
            sanitize={true}
            src={diaryImage}
            alt={diary.content}
          />
          {/* <div className="text-right ">
            <p className="text-sm">
              {new Date(diary.createAt).toLocaleDateString()}
            </p>
            <p className="text-lg">{diary.content}</p>
          </div> */}
        </div>
      </div>
    </Tilt>
  );
};

export default DiaryCard;
