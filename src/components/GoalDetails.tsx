
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  goal: any;
}

const GoalDetails: React.FC<ModalProps> = ({ isOpen, onClose, goal }) => {

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest(".modal-content")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!goal){
    return null
}

  if (!isOpen || !goal) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden backdrop-filter backdrop-blur-lg opacity-50 bg-black"></div>
      )}
      <div
        className={`fixed left-0 top-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden outline-none ${
          isOpen ? "flex" : "hidden"
        }`}
      >
        <div className="relative w-auto translate-y-[-50px] transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px] pt-40 ">
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col border-none  text-current shadow-lg outline-none bg-zinc-200 bg-opacity-90 rounded-md">
            <div className="flex flex-shrink-0  items-center justify-between p-4 d shadow-lg">
              <div
                className=" rounded-md w-full"
                ref={(node) => node && node.classList.add("modal-content")}
              >
                <p className="text-lg font-bold mt-4">{goal?.goalTitle}</p>
                <p className="text-lg font-bold mt-4">{goal?.goalDescription}</p>
                <p className="text-zinc-900 my-4 font-extralight">
                  {goal?.createAt.toLocaleDateString()}
                </p>
                <div className="flex flex-shrink-0 flex-wrap items-center justify-end pt-2">
                    <button
                    className="rounded bg-indigo-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:ring-0 active:bg-indigo-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                    onClick={onClose}
                    >
                    Close
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GoalDetails;