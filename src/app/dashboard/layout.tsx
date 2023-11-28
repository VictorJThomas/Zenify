/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import { useEffect, useRef, useState } from "react";
import { MdOutlineDarkMode, MdLightMode } from "react-icons/md";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme) setTheme(storedTheme);
  }, []);

  useEffect(() => {
    const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const onWindowMatch = () => {
      if (theme === "system") {
        if (localStorage.theme === "dark" || (!("theme" in localStorage) && darkQuery.matches)) {
          document.documentElement.classList.add("dark");
          setTheme("dark");
        } else {
          document.documentElement.classList.remove("dark");
          setTheme("light");
        }
      }
    };

    onWindowMatch();

    const darkQueryListener = (e: MediaQueryListEvent) => {
      if (theme === "system") {
        if (e.matches) {
          document.documentElement.classList.add("dark");
          setTheme("dark");
        } else {
          document.documentElement.classList.remove("dark");
          setTheme("light");
        }
      }
    };

    darkQuery.addEventListener("change", darkQueryListener);

    window.addEventListener("storage", () => {
      const storedTheme = localStorage.getItem("theme");
      if (storedTheme) setTheme(storedTheme);
    });

    return () => {
      darkQuery.removeEventListener("change", darkQueryListener);
      window.removeEventListener("storage", () => {});
    };
  }, [theme]);

  useEffect(() => {
    switch (theme) {
      case "dark":
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
        break;
      case "light":
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
        break;
      default:
        localStorage.removeItem("theme");
        break;
    }
  }, [theme]);

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

  const options = [
    {
      icon: <MdLightMode />,
      text: "light",
    },
    {
      icon: <MdOutlineDarkMode />,
      text: "dark",
    },
  ];

  return (
    <div>
      <div className="relative bg-gradient-to-tr dark:text-white from-[#EDA982] dark:from-[#BB8768] from-5% via-[#F9F4ED] dark:via-[#8C7A69] via-50% to-[#EF9A80] dark:to-[#CC856F] to-100%">
        <div className="flex items-start gap-4 w-full justify-between align-center relative ">
          {!isSidebarVisible ? (
            <div></div>
          ) : (
            <div className="left-0 top-0" ref={sidebarRef}>
              {isSidebarVisible && <LeftPanel />}
            </div>
          )}

          <main
            className={`flex-shrink-0 p-4 flex-col ${
              isSidebarVisible ? "w-[1245px] ml-64" : "w-[1500px]"
            }  align-center self-stretch py-[40px] px-[30px] rounded-xl bg-slate-100 dark:bg-[#28231E] dark:bg-opacity-30 bg-opacity-30  overflow-y-auto`}
            style={{ zIndex: 0 }}
          >
            <div className="flex items-center justify-between">
              <button
                className="rounded px-5 mx-10 my-5 py-2 text-xl font-medium uppercase leading-tight text-black transition duration-150 ease-in-out hover:bg-neutral-200 hover:shadow-lg focus:bg-neutral-300 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-neutral-500"
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
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>

              <div className="rounded p-8 text-2xl flex gap-4 justify-between text-black">
                {options.map((option) => (
                  <button
                    key={option.text}
                    onClick={() => setTheme(option.text)}
                    className={`${theme === option.text && "text-white"}`}
                  >
                    {option.icon}
                  </button>
                ))}
              </div>
            </div>
            {children}
          </main>
          <RightPanel />
        </div>
      </div>
    </div>
  );
}
