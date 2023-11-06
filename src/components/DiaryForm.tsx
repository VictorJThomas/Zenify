"use client"

import { useState, useRef } from "react";
import axios from "axios";
import { CldImage, CldUploadButton } from "next-cloudinary";
import { HiPhoto } from "react-icons/hi2";
import { useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

function DiaryForm() {
  const [content, setContent] = useState("");
  const [image, setImage] = useState("zenify/iuwojntnxlltocmrurfd");

  const { data: session } = useSession();
  const user = session?.user

  const submitRef = useRef<HTMLButtonElement | null>(null)

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/diary", {
        content: content,
        image: image,
        user: user,
      });
      toast.success("Created!");
      console.log(response);
      if (submitRef.current) {
        submitRef.current.click();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const onGetUser = async (e: {preventDefault: () => void}) => {
    try{
      const response = await axios.get("/api/diary", )
      console.log(response);
    }catch (e){
      console.log(e);
    }
  }

  const handleUpload = async (result: any) => {
    try {
      setImage(result.info.secure_url);
      console.log(image);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div
      data-te-modal-init
      className="fixed left-0 top-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="exampleModalWithIcon"
      aria-labelledby="exampleModalWithIconLabel"
      aria-hidden="true"
    >
      <div
        data-te-modal-dialog-ref
        className="pointer-events-none relative w-auto translate-y-[-50px] opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:max-w-[500px]"
      >
        <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <h5
              className="text-xl font-medium leading-normal text-neutral-800 dark:text-neutral-200"
              id="exampleModalWithIconLabel"
            >
              Create a Diary Entry
            </h5>
            <button
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close"
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
          <div
            className="relative flex-auto p-4 bg-zinc-100"
            data-te-modal-body-ref
          >
            <CldImage
              width="960"
              height="600"
              src={image}
              sizes="100vw"
              className="p-4 rounded-sm"
              alt={image}
            />
            <div className="flex gap-2 ">
              <CldUploadButton
                options={{ maxFiles: 1 }}
                onUpload={handleUpload}
                uploadPreset="muujlg2u"
              >
                <HiPhoto
                  size={60}
                  className="text-sky-500 rounded-md hover:ring-2 shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)]"
                />
              </CldUploadButton>
              <textarea
                className="resize-none w-full p-1 rounded-md shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] hover:ring-2"
                placeholder="Write about your day..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></textarea>
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              ref={submitRef}
              type="button"
              className="inline-block rounded bg-primary-100 px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:bg-primary-accent-100 focus:bg-primary-accent-100 focus:outline-none focus:ring-0 active:bg-primary-accent-200"
              data-te-modal-dismiss
              data-te-ripple-init
              data-te-ripple-color="light"
            >
              Close
            </button>
            <button
              type="button"
              className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)]"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={onSubmit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default DiaryForm;
