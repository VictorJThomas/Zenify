import LeftPanel from "@/components/LeftPanel";
import RightPanel from "@/components/RightPanel";
import Link from "next/link";

export default function Home({ children }: { children: React.ReactNode }) {
  let href = "/dashboard"

  return (
    <div className=" h-[calc(100vh)] bg-zinc-200 flex justify-center items-center text-black">
      <div className="w-full max-w-[600px] mx-auto mb-20">
        <h1 className="text-6xl mb-4">Zenify</h1>
        <p className="text-2xl text-black/60 mb-4">
          Bienvenido a Zenify!
        </p>
        <div>
          <Link href={href}>
            <button className="bg-blue-600 px-4 py-2 rounded-lg text-xl">
              Iniciar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
