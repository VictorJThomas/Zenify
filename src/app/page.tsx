import Link from "next/link";

export default function Home({ children }: { children: React.ReactNode }) {
  let href = "/login";

  return (
    <div className="landing-container w-screen h-screen">
      <div className="container">
        <p className="letter">Zenify</p>
        <div className="moon">
          <div className="orbit">
            <p>O</p>
          </div>
        </div>
        <div className="button">
          <Link href={href}>
            <button className="bg-blue-950 px-8 py-1 rounded-2xl text-2xl">
              Iniciar
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
