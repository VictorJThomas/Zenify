import { signIn } from "next-auth/react";

const GoogleSignInButton = () => {
    const loginWithGoogle = () => signIn('google');
    return (
        <button onClick={loginWithGoogle} className="inline-block w-full rounded-lg px-6 pb-2 bg-indigo-700 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
        >
            Continue with Google
        </button>
    )
}

export default GoogleSignInButton