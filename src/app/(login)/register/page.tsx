"use client";

import GoogleSignInButton from "@/components/GoogleSignInButton";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type LoginType = {
  email: string;
  password: string;
};
const LoginPage: React.FC<{}> = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const session = useSession();
  const [data, setData] = useState<LoginType>({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/dashboard");
    }
    const init = async () => {
      const { Datepicker, Input, initTE } = await import("tw-elements");
      initTE({ Datepicker, Input });
    };
    init();
  });

  const loginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await signIn("credentials", { ...data, redirect: false });

    if (res?.error) {
      setError(res.error as string);
      toast.error(error);
    }

    if (res?.ok) {
      toast.success("Successfully toasted!");
      router.push("/chat");
    }
  };

  return (
    <section className="gradient-form h-full bg-neutral-200 dark:bg-neutral-700">
      <div className="container h-full p-10">
        <div className="g-6 flex h-full flex-wrap items-center justify-center text-neutral-800 dark:text-neutral-200">
          <div className="w-full">
            <div className="block rounded-lg bg-white shadow-lg dark:bg-neutral-800">
              <div className="g-0 lg:flex lg:flex-wrap">
                <div className="px-4 md:px-0 lg:w-6/12">
                  <div className="md:mx-6 md:p-12">
                    <div className="text-center">
                      <Image
                        className="mx-auto w-48"
                        src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/lotus.webp"
                        alt="logo"
                        width="176"
                        height="121"
                      />
                      <h4 className="mb-12 mt-1 pb-1 text-xl font-semibold">
                        We are Zenify!
                      </h4>
                    </div>

                    <form onSubmit={loginUser}>
                      <p className="mb-4">Please login to your account</p>
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="email"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          value={data.email}
                          onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                          }}
                        />
                        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                          Email address
                        </label>
                      </div>
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          value={data.password}
                          onChange={(e) => {
                            setData({ ...data, password: e.target.value });
                          }}
                        />
                        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                          Password
                        </label>
                      </div>
                      <div className="mb-3 pb-1 pt-1 text-center">
                        <button
                          className="inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                          style={{
                            background:
                              "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                          }}
                        >
                          Log in
                        </button>
                        <a href="#!">Forgot password?</a>
                      </div>
                      <div className="flex mb-4 items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 mb-0 text-center font-semibold">
                          OR
                        </p>
                      </div>
                      <GoogleSignInButton />
                      <div className="flex items-center justify-between pb-6">
                        <p className="mb-0 mr-2">Dont have an account?</p>
                        <Link
                          type="button"
                          href="/register"
                          className="inline-block rounded border-2 border-danger px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger transition duration-150 ease-in-out hover:border-danger-600 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-danger-600 focus:border-danger-600 focus:text-danger-600 focus:outline-none focus:ring-0 active:border-danger-700 active:text-danger-700 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Register
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div
                  className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none"
                  style={{
                    background:
                      "linear-gradient(to right, #ee7724, #d8363a, #dd3675, #b44593)",
                  }}
                >
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-semibold">
                      Welcome to Zenify - Your Personal Journal Companion
                    </h4>
                    <p className="text-sm mb-8">
                      Unleash your creativity and capture life&apos;s moments
                      with Zenify. Write, reflect, and set goals in your private
                      digital sanctuary. Start your journaling journey today!
                    </p>
                    <p className="text-sm pb-2">
                      📝 Create Daily Entries: Capture your thoughts,
                      experiences, and emotions.
                    </p>
                    <p className="text-sm pb-2">
                      📚 Organize and Reflect: Easily browse past entries and
                      see how far you&apos;ve come.
                    </p>
                    <p className="text-sm pb-2">
                      🎯 Set Goals: Track your progress and celebrate your
                      achievements.
                    </p>
                    <p className="text-sm pb-2">
                      🌟 Find Inspiration: Explore prompts and quotes to spark
                      your creativity.
                    </p>
                    <p className="text-sm pb-2">
                      🔒 Secure and Private: Your data is safe and completely
                      confidential.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
