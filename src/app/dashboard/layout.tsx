import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>
        <div className="w-screen flex flex-3 justify-between p-8">
          <LeftPanel />
          <main className="p-4 mx-2 rounded-xl basis-1/1 w-full bg-zinc-100">
            {children}
          </main>
          <RightPanel />
        </div>
      </main>
    </div>
  );
}
