'use client'
import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import { useSession } from "next-auth/react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const user = session?.user;

  if(session?.user?.role == 'CLIENT' ){
    return (
      <div>
        <main>
        <h1>Usted es Cliente</h1>
          <div className="flex flex-3 gap-[20px] h-screen w-full justify-between">
            <LeftPanel />
            <main className="flex-shrink-0 flex-col max-w-[1200px] min-w-[1200px] align-center self-stretch gap-[22px] py-[40px] px-[30px] rounded-xl bg-zinc-100">
              {children}
            </main>
            <RightPanel />
          </div>
        </main>
      </div>
    );
  }
  else(session?.user?.role == 'PSYCHOLOGIST' )
    return (
      <div>
        <main>
          <h1>Usted es psicologo</h1>
          <div className="flex flex-3 gap-[20px] h-screen w-full justify-between">
            <LeftPanel />
            <main className="flex-shrink-0 flex-col max-w-[1200px] min-w-[1200px] align-center self-stretch gap-[22px] py-[40px] px-[30px] rounded-xl bg-zinc-100">
              {children}
            </main>
            <RightPanel />
          </div>
        </main>
      </div>
    );
}
