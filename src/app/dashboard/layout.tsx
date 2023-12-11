import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getFriendsByUserId } from "@/helpers/get-friends-by-user-id";
import { fetchRedis } from "@/helpers/redis";
import { SidebarOption } from "@/types/typing";
import { getServerSession } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReactNode } from "react";
import { Plus, Newspaper, Focus, Users, Bot, Settings } from "lucide-react";
import RightPanel from "@/components/RightPanel";
import imageDefaultUser from "~/assets/imageDefaultUser.svg";
import SidebarChatList from "../chat/components/SidebarChatList";
import FriendRequestSidebarOptions from "../chat/components/FriendRequestSidebarOptions";
import SignOutButton from "../chat/components/SignOutButton";
import icono_del_logo from "~/assets/icono_del_logo.svg"

interface ChatsLayoutProps {
  children: ReactNode;
}

const sidebarOptions: SidebarOption[] = [
  {
    id: 1,
    name: "Add friend",
    href: `${process.env.NEXT_PUBLIC_URL}/chat/add`,
    Icon: <Plus className="h-4 w-4 text-black" />,
  },
  {
    id: 2,
    name: "Posts",
    href: `${process.env.NEXT_PUBLIC_URL}/dashboard/post`,
    Icon: <Newspaper className="h-4 w-4 text-black" />,
  },
  {
    id: 3,
    name: "Focus Mode",
    href: `${process.env.NEXT_PUBLIC_URL}/dashboard/focus`,
    Icon: <Focus className="h-4 w-4 text-black" />,
  },
  {
    id: 4,
    name: "Professionals",
    href: `${process.env.NEXT_PUBLIC_URL}/dashboard/professionals`,
    Icon: <Users className="h-4 w-4 text-black" />,
  },
  {
    id: 5,
    name: "ChatBot",
    href: `${process.env.NEXT_PUBLIC_URL}/dashboard/chat`,
    Icon: <Bot className="h-4 w-4 text-black" />,
  },
  {
    id: 6,
    name: "Settings",
    href: `${process.env.NEXT_PUBLIC_URL}/dashboard/settings`,
    Icon: <Settings className="h-4 w-4 text-black" />,
  },
];

const DashboardLayout = async ({ children }: ChatsLayoutProps) => {
  const session = await getServerSession(authOptions);
  if (!session) notFound();

  const friends = await getFriendsByUserId(session.user.id);

  const unseenRequestCount = (
    (await fetchRedis(
      "smembers",
      `user:${session.user.id}:incoming_friend_requests`
    )) as User[]
  ).length;


  return (
    <div className="w-full flex items-start justify-between h-screen relative">
      <aside className="hidden md:flex h-full w-full max-w-xs grow flex-col gap-y-5 overflow-y-hidden border-r border-gray-200 px-6">
        <Link href="/dashboard" className="flex h-16 shrink-0 items-center">
          <Image alt="logo" width={34} className="h-12 w-auto text-indigo-600" src={icono_del_logo}/>
        </Link>

        {friends.length > 0 ? (
          <div className="text-xs font-semibold leading-6 text-gray-400">
            Your chats
          </div>
        ) : ""}

        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <SidebarChatList sessionId={session.user.id} friends={friends} />
            </li>
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Overview
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                <li>
                  <FriendRequestSidebarOptions
                    sessionId={session.user.id}
                    initialUnseenRequestCount={unseenRequestCount}
                  />
                </li>
                {sidebarOptions.map((option) => {
                  return (
                    <li key={option.id}>
                      <Link
                        href={option.href}
                        className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group flex gap-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      >
                        <span className="text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                          {option.Icon}
                        </span>

                        <span className="truncate">{option.name}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>

            <li className="-ml-4 mt-auto flex items-center">
              <div className="flex flex-1 items-center gap-x-4 px-2 py-3 text-sm font-semibold leading-6 text-gray-900">
                <div className="relative h-8 w-8 bg-gray-50">
                  <Image
                    fill
                    referrerPolicy="no-referrer"
                    className="rounded-full"
                    src={session.user.image || imageDefaultUser}
                    alt="Your profile picture"
                  />
                </div>
                <span className="sr-only">Your profile</span>
                <div className="flex flex-col">
                  <span aria-hidden="true">{session.user.name}</span>
                  <span className="text-xs text-zinc-400" aria-hidden="true">
                    {session.user.email}
                  </span>
                </div>
              </div>
              <SignOutButton className="h-full aspect-square" />
            </li>
          </ul>
        </nav>
      </aside>

      <main id="main-content" className="max-h-screen flex-shrink-0 align-center self-stretch container pl-40 pr-10 -mt-48 md:py-12 text-black">
        {children}
      </main>
      <RightPanel />
    </div>
  );
};

export default DashboardLayout;
