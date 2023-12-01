"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import imageDefaultUser from "@/../public/assets/imageDefaultUser.svg";
import UploadPicture from "./UploadPicture";

function ProfilePictureAndName() {
  const { data: session } = useSession();
  const userImage = session?.user?.image || imageDefaultUser;

  useEffect(() => {
    const init = async () => {
      const { Modal, Ripple, initTE } = await import("tw-elements");
      initTE({ Modal, Ripple });
    };
    init();
  }, []);

  return (
    <div className="w-full text-center pb-8">
      <div className="flex flex-2 gap-4 m-4 justify-center">
        <div>
          <button
            className="rounded-full bg-zinc-300 p-1 text-xs font-medium uppercase leading-normal text-white shadow-[0_10px_40px_0px_rgba(0,0,0,0.15)] transition duration-150 ease-in-out hover:bg-primary-700 focus:bg-primary-700 focus:outline-none focus:ring-0 active:bg-primary-800"
            data-te-toggle="modal"
            data-te-target="#uploadpicture"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <Image
              priority
              className="bg-zinc-200 rounded-full"
              src={userImage}
              alt={`${session?.user?.email} image`}
              width={100}
              height={100}
            />
          </button>
        </div>
      </div>
      <UploadPicture />
      <p className="text-base font-medium pt-6">{session?.user?.name}</p>
    </div>
  );
}

export default ProfilePictureAndName;
