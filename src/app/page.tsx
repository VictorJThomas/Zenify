import Link from "next/link";

export default function Home() {
  return (
    <main className="w-full">
      <h1>Zenify</h1>
      <Link href="/register">Register Page</Link>
      <Link href="/login">Login Page</Link>
    </main>
  )
}
