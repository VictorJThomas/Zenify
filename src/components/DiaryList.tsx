import { Diary } from "@prisma/client";
import DiaryCard from "./DiaryCard";

function DiaryList({ diary }: { diary: Diary }) {
  
  return (
    <div className="scroll-smooth focus:scroll-auto">
      <DiaryCard diary={diary}/>
    </div>
  );
}

export default DiaryList;
