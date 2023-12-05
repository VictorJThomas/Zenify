"use client"

import AddGoal from "@/components/AddGoal";
import { AiOutlinePlusSquare } from "react-icons/ai";
import { Focus } from "@prisma/client";
import { useState } from "react";
import axios from "axios";

type FocusType = {
    id: string;
    goalTitle: string;
    goalDescription: string | null;
    goalTime: Date;
    createAt: Date;
    updateAt: Date;
    status: string;
    userId: string;
  };


const FocusPage = () => {
    const [goals, setGoals] = useState<FocusType[]>([]);
    const [selectedGoals, setSelectedGoals] = useState<Focus | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    const adaptGoalData = (data: any) => {
        return {
          id: data.id,
          goalTitle: data.goalTitle,
          goalDescription: data.goalDescription,
          goalTime: new Date(data.goalTime),
          createAt: new Date(data.createAt),
          updateAt: new Date(data.updateAt),
          status: data.status,
          userId: data.userId
        };
      };

      const loadGoals = async () => {
        try {
          const res = await axios.get('/api/focus');
          console.log(res.data.focus)
          const adaptedData = res.data.focus.map((item: any) => adaptGoalData(item));
          setGoals(adaptedData);
        } catch (e) {
          console.log(e);
        }
      };

    const handleFocusCreated = () => {
        loadGoals();
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
            <AddGoal isOpen={isFormModalOpen} onClose={() => setIsFormModalOpen(false)} onFocusCreated={handleFocusCreated}/>
          </div>
        </aside>
      );
}

export default FocusPage