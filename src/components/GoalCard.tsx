"use client";

import { Focus } from "@prisma/client";

const GoalCard = ({ goal }: { goal: Focus }) => {
  const maxContentLength = 10;
 
  return (
    <div
      key={goal.id}
      className="relative hover:cursor-pointer rounded-xl my-2 flex justify-between overflow-hidden transition duration-300 ease-in-out hover:scale-105 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-right font-semibold">
        <p className="text-xs">
          {new Date(goal.createAt).toLocaleDateString()}
        </p>
        <p className="text-lg">
          {goal.goalTitle.length > maxContentLength
            ? goal.goalTitle.slice(0, maxContentLength) + '...'
            : goal.goalTitle}
        </p>
        <p className="text-[0.70rem]">{goal.status}</p>
      </div>
    </div>
  );
};

export default GoalCard;
