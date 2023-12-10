"use client";

import imageDefaultUser from "~/assets/imageDefaultUser.svg";
import Image from "next/image";
import ChatRequest from "./ChatRequest";
import axios from "axios";
import { useEffect, useState } from "react";
import { Professinals } from "@/types";

const ProfessionalsPage = () => {
  const [pros, setPros] = useState<Professinals[]>([]);

  const getPros = async () => {
    try {
      const res = await axios.get("/api/pros");
      setPros(res.data.professionals);
    } catch (e) {
      console.log("Get Professionals Error: ", e);
    }
  };
  
  useEffect(() => {
    getPros();
  }, []);

  return (
    <div className="container pl-36 pr-20 py-12">
      <h1 className="font-bold text-black text-5xl mb-8">Profesionales</h1>

      {pros.map((professional) => (
        <div
          key={professional.id}
          className="relative bg-zinc-50 border border-zinc-200 p-3 m-3 rounded-md"
        >
          <div className="relative sm:flex">
            <div className="mb-4 flex-shrink-0 sm:mb-0 sm:mr-4">
              <div className="relative h-6 w-6">
                <Image
                  referrerPolicy="no-referrer"
                  className="rounded-full"
                  src={professional.image || imageDefaultUser}
                  alt={`${professional.name} profile picture`}
                  fill
                />
              </div>
            </div>
            <h4 className="text-lg text-black font-semibold">
              {professional.name}
            </h4>
          </div>
          <div className="right-4 inset-y-0 flex items-center">
            <ChatRequest email={professional.email || ""} />
          </div>
        </div>
      ))}

    </div>
  );
};

export default ProfessionalsPage;
