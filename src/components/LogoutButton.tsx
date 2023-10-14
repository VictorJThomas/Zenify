"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function LogoutButton() {

  const { data: session } = useSession();
  if (session) {
    return (
      <div>
        {/* Signed in as {session?.user?.email} <br /> */}
        <button
          className="my-2 w-full rounded-lg p-2 text-left text-lg font-medium hover:bg-blue-100"
          onClick={() => signOut()}
        >
          Sign out
        </button>
      </div>
    );
  }
}