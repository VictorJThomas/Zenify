"use client";

import { useGoals } from "../context/GoalContext";
import { useRouter } from "next/navigation";
import { VscTrash } from "react-icons/vsc";
import { toast } from "react-hot-toast";

const GoalCard = ({ goal }: { goal: any}) => {
  const maxContentLength = 10;
  const { deleteGoal } = useGoals();
  const router = useRouter();
 
  return (
    <div
    className="bg-gray-700 hover:bg-gray-600 cursor-pointer px-20 py-5 m-2 flex justify-between"
    onClick={() => router.push(`/edit/${goal.id}`)}
    >
      <div
        key={goal.id}
        className="relative hover:cursor-pointer rounded-xl my-2 flex justify-between overflow-hidden transition duration-300 ease-in-out hover:scale-105 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-right font-semibold">
          <p className="text-lg">
            {goal.goalTitle.length > maxContentLength
              ? goal.goalTitle.slice(0, maxContentLength) + '...'
              : goal.goalTitle}
          </p>
          <button
            className="bg-red-700 hover:bg-red-600 px-3 py-1 inline-flex items-center"
            onClick={(e) => {
              e.stopPropagation();
              const accept = confirm(
                "Are you sure you want to delete this task?"
              );
              if (accept) deleteGoal(goal.id);
              toast.success("Task deleted successfully");
            }}
          >
            <VscTrash className="mr-2" /> Delete
          </button>
          <p className="text-xs">
            {new Date(goal.goalTime).toTimeString()}
          </p>
          <p className="text-[0.70rem]">{goal.status}</p>
        </div>
      </div>
    </div>
  );
};

export default GoalCard;
