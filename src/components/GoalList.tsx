import { Focus } from "@prisma/client";
import DiaryCard from "./DiaryCard";
import GoalCard from "./GoalCard";

function GoalList({ goal, onCardClick }: { goal: Focus, onCardClick: () => void }) {

  return (
    <div className="snap-center" onClick={onCardClick}>
      <GoalCard goal={goal} />
    </div>
  );
}

export default GoalList;