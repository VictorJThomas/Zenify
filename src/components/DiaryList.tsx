import { Diary } from "@prisma/client";
import DiaryCard from "./DiaryCard";

function DiaryList({ diary, onCardClick }: { diary: Diary, onCardClick: () => void }) {

  return (
    <div className="snap-center" onClick={onCardClick}>
      <DiaryCard diary={diary} />
    </div>
  );
}

export default DiaryList;
