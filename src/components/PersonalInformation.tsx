"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import SwitchButton from "./SwitchButton";

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

  const getCurrentRol = () => {
    if (session?.user.role === "CLIENT") {
      return "Usuario";
    } else {
      return "Psicologo"
    }
  };

  const role = getCurrentRol();
  
  return (
    <div className="w-full dark:text-white text-black bg-slate-100 bg-opacity-50 rounded-2xl p-4">
      <h1 className="font-semibold text-center pt-4">Account Datails</h1>
      <div className="pt-4 p-4">
        <h4 className="pb-2 font-semibold">Email account:</h4>
        <p className="pb-4">{session?.user.email}</p>
        <h4 className="pb-2 font-semibold">Type account:</h4>
        <p className="pb-4">{role}</p>
        <h4 className="pb-2 font-semibold">Change type</h4>
        <SwitchButton />
        <h4 className="pb-2 font-semibold">Change user name:</h4>
        <div className="flex flex-2 gap-4 pt-2">
          <div className="relative mb-4" data-te-input-wrapper-init>
            <input
              type="text"
              className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-black transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-black peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-black dark:peer-focus:text-black">
              New user name
            </label>
          </div>
        </div>
      </div>
      <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md p-4 dark:border-opacity-50">
        <button
          type="button"
          className=" rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] disabled:opacity-50"
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
