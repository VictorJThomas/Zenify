"use client";

import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import { useEffect, useRef, useState } from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

  const sidebarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        closeSidebar();
      }
    };

    if (isSidebarVisible) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isSidebarVisible]);

  return (
    <div>
      <div className="relative bg-gradient-to-r from-indigo-200  to-red-200">
        <div className="flex items-start gap-4 w-full justify-between align-center relative ">
          {!isSidebarVisible ? (
            <div></div>
          ) : (
            <div className="fixed left-0 top-0" ref={sidebarRef}>
              {isSidebarVisible && <LeftPanel />}
            </div>
          )}

          <main
            className={`flex-shrink-0 p-4 flex-col ${
              isSidebarVisible ? "w-[1500px] ml-[34px]" : "w-[1500px]"
            }  align-center self-stretch py-[40px] px-[30px] rounded-xl bg-slate-100 bg-opacity-30 overflow-y-auto`}
          >
            <button
              className="rounded px-5 mx-10 my-5 py-2 text-xs font-medium uppercase leading-tight text-black transition duration-150 ease-in-out hover:bg-neutral-500 hover:shadow-lg focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-500"
              onClick={toggleSidebar}
            >
              <span className="block [&>svg]:h-5 [&>svg]:w-5 [&>svg]:text-black">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                    clip-rule="evenodd"
                  />
                </svg>
              </span>
            </button>
            {children}
          </main>
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
