"use client"

import AddGoal from "@/components/AddGoal";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { useEffect, useState } from "react";
import axios from "axios";
import GoalList from "@/components/GoalList";
import GoalDetails from "@/components/GoalDetails";
import { useGoals } from "@/context/GoalContext";
import { useSession } from "next-auth/react";
import { VscTasklist } from "react-icons/vsc";

const FocusPage = () => {
    const { goals } = useGoals();
    const [selectedGoals, setSelectedGoal] = useState<any | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const { data: session } = useSession();
    const user = session?.user;

      useEffect(() => {
        const init = async () => {
          const { Modal, Ripple, initTE } = await import("tw-elements");
          initTE({ Modal, Ripple });
        };
        init();
      }, []);

    const handleCardClick = (goal: any) => {
      setSelectedGoal(goal);
      setIsModalOpen(true);
    };

    const closeModal = () => {
      setSelectedGoal(null);
      setIsModalOpen(false);
    };
    
    const openFormModal = () => {
      setIsFormModalOpen(true);
    };

    return (
        <aside className="sticky top-0 right-0 w-[1468px] bg-opacity-30 h-screen py-[25px] px-[20px] flex-col justify-between items-center self-stretch flex-shrink-0  rounded-l-xl">
          <div className="flex flex-2 gap-4 m-4 justify-center">
            <div className="font-semibold text-xl pt-2">Goals Section</div>
            <div className="">
            <button
                className="rounded-full bg-zinc-300 bg-opacity-40 p-3 text-xs font-medium uppercase leading-normal text-black shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] transition duration-150 ease-in-out hover:text-white focus:text-white active:text-white hover:bg-zinc-600 focus:bg-zinc-600 focus:outline-none focus:ring-0 active:bg-zinc-800"
                onClick={openFormModal}
              >
                <AiOutlinePlusSquare size="30" />
              </button>
            </div>
            <AddGoal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)}/>
          </div>
          {goals.length === 0 ? (
              <div className="block">
                <h2 className="text-2xl">There are no tasks</h2>
                <VscTasklist size="8rem" />
              </div>
            ) : (
            <div className="overflow-y-scroll max-h-[700px] scroll-smooth focus:scroll-auto snap-mandatory snap-y p-4">
              {goals.map((goal: any) => (
                <GoalList
                key={goal.id}
                goal={goal}
                onCardClick={() => handleCardClick(goal)}
              />
              ))}
            <GoalDetails
              isOpen={isModalOpen}
              onClose={closeModal}
              goal={selectedGoals}
            />
            </div>
             )}
        </aside>
      );
}

export default FocusPage