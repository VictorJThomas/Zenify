import GoalCard from "./GoalCard";

function GoalList({ goal, onCardClick }: { goal: any, onCardClick: () => void }) {

  return (
    <div className="snap-center" onClick={onCardClick}>
      <GoalCard goal={goal} />
    </div>
  );
}

export default GoalList;