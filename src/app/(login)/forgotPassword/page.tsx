"use client";

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const onSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/settings/forgotpassword", {
        email: email,
      });
      toast.success("Email Send!");
      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <div>
      ForgotPassword
      <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
        <div className="flex flex-2 gap-4 m-4 justify-center">
          <h4>
            Name:
            <textarea
              className="resize-none w-full p-1 rounded-md shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] hover:ring-2"
              placeholder="type a email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></textarea>
          </h4>
        </div>
        <button
          type="button"
          className="ml-1 inline-block rounded bg-primary px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#3b71ca] transition duration-150 ease-in-out hover:bg-primary-600 hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:bg-primary-600 focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] focus:outline-none focus:ring-0 active:bg-primary-700 active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.3),0_4px_18px_0_rgba(59,113,202,0.2)] dark:shadow-[0_4px_9px_-4px_rgba(59,113,202,0.5)] dark:hover:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:focus:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] dark:active:shadow-[0_8px_9px_-4px_rgba(59,113,202,0.2),0_4px_18px_0_rgba(59,113,202,0.1)] disabled:opacity-50"
          data-te-ripple-init
          data-te-ripple-color="light"
          onClick={onSubmit}
          disabled={!email}
        >
          Send Email
        </button>
        <a href="/login">Return</a>
      </div>
    </div>
  );
};

export default ForgotPassword;
