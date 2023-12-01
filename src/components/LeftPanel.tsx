"use client";

import ProfileCard from "./ProfileCard";
import LogoutButton from "./LogoutButton";
import Link from "next/link";
import { RiFocusLine, RiHome2Line } from "react-icons/ri";
import { BsPeople } from "react-icons/bs";
import { CiChat1, CiChat2 } from "react-icons/ci";
import { SlSettings } from "react-icons/sl";
import { usePathname } from "next/navigation";

const LeftPanel = () => {
  const pathname = usePathname();

  const menu = [
    {
      name: "Posts",
      url: "dashboard/post",
      icon: <RiHome2Line />,
    },
    {
      name: "Focus Mode",
      url: "dashboard/focus",
      icon: <RiFocusLine />,
    },
    {
      name: "Professionals",
      url: "dashboard/professionals",
      icon: <BsPeople />,
    },
    {
      name: "ChatBot",
      url: "dashboard/chat",
      icon: <CiChat1 />,
    },
    {
      name: "Chat",
      url: "dashboard/chats",
      icon: <CiChat2 />,
    },
    {
      name: "Settings",
      url: "dashboard/settings",
      icon: <SlSettings />,
    },
  ];

  const isActive = (url: string) => pathname === `/${url}`;

  return (
    <div className="flex fixed flex-col h-screen">
      <aside className="h-screen z-[1] w-[270px] py-[25px] px-[20px] flex-col justify-between self-stretch flex-shrink-0 bg-slate-200 dark:bg-[#28231E] dark:bg-opacity-30 bg-opacity-30 rounded-r-xl" >
        <ProfileCard />
        <div>
          {menu.map((item) => (
            <Link key={item.url} href={`/${item.url}`}>
              <button
                className={`my-2 w-full rounded-lg p-2 text-left text-lg font-medium dark:hover:bg-[#543727] hover:bg-blue-100 flex items-center ${
                  isActive(item.url) ? "bg-blue-100 dark:bg-[#543727]" : ""
                }`}
              >
                {item.icon}
                <span className="ml-2 ">
                  {item.name}
                </span>
              </button>
            </Link>
          ))}
        </div>
        <div className="mt-[26rem] flex flex-col justify-between">
          <LogoutButton />
        </div>
      </aside>
    </div>
  );
};

export default LeftPanel;
