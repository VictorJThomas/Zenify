"use client"

import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import Link from "next/link";

export const Navbar = async () => {
  const session = getServerSession();
  return (
    <nav className="bg-zinc-900 p-4">
      <div className="container mx-auto flex justify-between">
        <Link href="/">
          <h1 className="font-bold text-xl">NextAuth</h1>
        </Link>

        <ul className="flex gap-x-2">
          {await session ? (
            <>
              <li className="px-3 py-1">
                <Link href="/dashboard">Perfil</Link>
              </li>
              <button
                onClick={ () => {
                   signOut({
                    callbackUrl: "/",
                  });
                }}
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <li className="bg-indigo-500 px-3 py-1">
                <Link href="/">Login</Link>
              </li>
              <li className="bg-indigo-700 px-3 py-1">
                <Link href="/register">Register</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};
