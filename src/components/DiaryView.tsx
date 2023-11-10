import { Diary } from "@prisma/client";
import { CldImage } from "next-cloudinary";
import { useEffect } from "react";
import imageDefault from "@/../public/assets/imageDefault.svg";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  diary: Diary | null;
}

const DiaryView: React.FC<ModalProps> = ({ isOpen, onClose, diary }) => {
    const diaryImage = diary?.image || imageDefault;

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

  if (!diary){
    return null
}

  if (!isOpen || !diary) {
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
          <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 rounded-md">
            <div className="flex flex-shrink-0  items-center justify-between p-4 d shadow-lg">
              <div
                className=" rounded-md w-full"
                ref={(node) => node && node.classList.add("modal-content")}
              >
                <h2 className="text-2xl font-bold mb-4">{diary?.content}</h2>
                <p className="text-gray-700 mb-4">
                  {diary?.createAt.toLocaleDateString()}
                </p>
                <CldImage
                  width="960"
                  height="600"
                  src={diaryImage}
                  sizes="100vw"
                  className="rounded-md"
                  alt={diary.content}
                />
                <div className="flex flex-shrink-0 flex-wrap items-center justify-end pt-2">
                    <button
                    className="inline-block rounded-md bg-primary-100 px-2 pb-2 pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
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

export default DiaryView;
