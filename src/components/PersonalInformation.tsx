"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";

function PersonalInformation() {
  const { data: session } = useSession();
  const user = session?.user;
  const [name, setName] = useState("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.put("/api/settings/personalInformation", {
        name: name,
        user: user,
      });
      toast.success("Updated!");
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div className="w-full text-center pb-8">
        <div>
            <h1>Personal Information</h1>
        </div>
        <div className="flex flex-2 gap-4 m-4 justify-center">
            <h4>Name:
                <textarea 
                className="resize-none w-full p-1 rounded-md shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] hover:ring-2"
                placeholder={session?.user?.name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                >
                </textarea>
            </h4>
        </div>
        <div>
            <h4>Created At:</h4>
            <p>{new Date(session?.user?.createdAt).toLocaleDateString()}</p>
            <></>
        </div>
        <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <button
              type="button"
              className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] disabled:opacity-50"
              data-te-ripple-init
              data-te-ripple-color="light"
              onClick={onSubmit}
              disabled={!name}
            >
              Save changes
            </button>
        </div>
    </div>
  );
}

export default PersonalInformation;
