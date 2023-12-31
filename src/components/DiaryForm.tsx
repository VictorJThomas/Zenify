"use client";

import { useState, useRef, useEffect } from "react";
import axios from "axios";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

interface DiaryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onDiaryCreated?: () => void;
}

function DiaryForm({ onDiaryCreated, isOpen, onClose }: DiaryFormProps) {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("zenify/iuwojntnxlltocmrurfd");

  const { data: session } = useSession();
  const user = session?.user;

  const submitRef = useRef<HTMLButtonElement | null>(null);

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/diary", {
        content: content,
        image: image,
        user: user,
      });
      if (onDiaryCreated) {
        onDiaryCreated();

        setContent("")
        setImage("zenify/iuwojntnxlltocmrurfd")
      }
      toast.success("Created!");
      if (submitRef.current) {
        submitRef.current.click();
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        event.target instanceof HTMLElement &&
        !event.target.closest(".modal-content-form")
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  const handleUpload = async (result: any) => {
    try {
      setImage(result.info.secure_url);
      console.log(image);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[1055] h-full w-full overflow-y-auto overflow-x-hidden backdrop-filter backdrop-blur-lg opacity-50 bg-black"></div>
      )}
      <div
        className={`fixed left-0 top-0 z-[1055] ${
          isOpen ? "block" : "hidden"
        } h-full w-full overflow-y-auto overflow-x-hidden outline-none`}
      >
        <div className="flex items-center justify-center h-full">
          <div className="w-[500px] bg-zinc-200 bg-opacity-90 p-4 rounded-md shadow-lg"  ref={(node) => node && node.classList.add("modal-content-form")}>
            <div className="relative">
              <div className="flex justify-between items-center border-b-2 pb-4">
                <h5 className="text-xl font-medium leading-normal text-neutral-800">
                  Crear entrada de diario
                </h5>
                <button
                  type="button"
                  className="hover:opacity-75 opacity-100 focus:opacity-100"
                  onClick={onClose}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="h-6 w-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="p-4">
                <CldImage
                  width="960"
                  height="600"
                  src={image}
                  sizes="100vw"
                  className="p-4 rounded-s"
                  alt={image}
                />
                <div className="flex gap-2">
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="muujlg2u"
                  >
                    <HiPhoto
                      size={60}
                      className="text-indigo-600 rounded-md hover:ring-2 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
                    />
                  </CldUploadButton>
                  <textarea
                    className="resize-none w-full overflow-hidden bg-white py-4 px-4 text-base text-black placeholder:text-slate-400 focus:border-[#3B71CA] focus:outline-none focus:ring-4 focus:ring-[#3B71CA]/10 rounded-3xl shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] hover:ring-2"
                    placeholder="Escribe sobre tu dia..."
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex justify-end pt-4 border-t-2">
                <button
                  ref={submitRef}
                  type="button"
                  className="mr-2 inline-block rounded px-6 py-2.5 text-xs font-medium uppercase leading-normal transition duration-150 ease-in-out"
                  onClick={onClose}
                >
                  Cerrar
                </button>
                <button
                  type="button"
                  className="rounded bg-indigo-400 px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-indigo-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-indigo-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:ring-0 active:bg-indigo-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
                  onClick={onSubmit}
                  disabled={!content}
                >
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default DiaryForm;
