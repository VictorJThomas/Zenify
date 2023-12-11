"use client";

import GoogleSignInButton from "@/components/GoogleSignInButton";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import zend_logo_1 from "~/assets/zend_logo_1.svg";

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
      router.push("/dashboard/chat");
    }
    const init = async () => {
      const { Input, initTE } = await import("tw-elements");
      initTE({ Input });
    };
    init();
  });

  const loginUser = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const res = await signIn("credentials", { ...data, redirect: false });

    if (res?.ok) {
      toast.success("Successfully sign in!");
      router.push("/dashboard/chat");
    }

    if (res?.error) {
      setError(res.error as string);
      toast.error(error);
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
                    <div className="text-center mb-10">
                      <Image
                        className="mx-auto "
                        src={zend_logo_1}
                        alt="logo"
                        width="300"
                        height="250"
                      />
                    </div>
                    <form onSubmit={loginUser}>
                      <p className="mb-4">Accede a tu cuenta</p>
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="email"
                          className="peer block min-h-[auto] w-full rounded-lg border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          value={data.email}
                          onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                          }}
                        />
                        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                          Correo Electrónico
                        </label>
                      </div>
                      <div className="relative mb-4" data-te-input-wrapper-init>
                        <input
                          type="password"
                          className="peer block min-h-[auto] w-full rounded-lg border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                          value={data.password}
                          onChange={(e) => {
                            setData({ ...data, password: e.target.value });
                          }}
                        />
                        <label className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-500 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-primary-600 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-primary">
                          Contraseña
                        </label>
                      </div>
                      <div className="mb-3 pb-1 pt-1 text-center">
                        <button
                          className="inline-block w-full rounded-lg px-6 pb-2 bg-indigo-700 pt-2.5 text-xs font-medium uppercase leading-normal text-white shadow-[0_4px_9px_-4px_rgba(0,0,0,0.2)] transition duration-150 ease-in-out hover:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)] focus:outline-none focus:ring-0 active:shadow-[0_8px_9px_-4px_rgba(0,0,0,0.1),0_4px_18px_0_rgba(0,0,0,0.2)]"
                          type="submit"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Iniciar sesión
                        </button>
                        <a href="/forgotPassword">Olvidé la contraseña</a>
                      </div>
                      <div className="flex mb-4 items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                        <p className="mx-4 text-center font-semibold">O</p>
                      </div>
                      <GoogleSignInButton />
                      <div className="flex items-center justify-between py-6">
                        <p className="mb-0 mr-2">¿No tienes cuenta?</p>
                        <Link
                          type="button"
                          href="/register"
                          className="inline-block rounded-lg border-2 border-indigo-300 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-indigo-800 transition duration-150 ease-in-out hover:border-indigo-200 hover:bg-neutral-500 hover:bg-opacity-10 hover:text-indigo-600 focus:border-indigo-600 focus:indigo-red-800 focus:outline-none focus:ring-0 active:border-indigo-600 active:text-indigo-800 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
                          data-te-ripple-init
                          data-te-ripple-color="light"
                        >
                          Registrar
                        </Link>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex items-center rounded-b-lg lg:w-6/12 lg:rounded-r-lg lg:rounded-bl-none bg-indigo-700">
                  <div className="px-4 py-6 text-white md:mx-6 md:p-12">
                    <h4 className="mb-6 text-xl font-bold">
                      Bienvenido a Zenify - Tu Diario Personal
                    </h4>
                    <p className="text-sm mb-8">
                      Libera tu creatividad y captura los momentos de tu vida
                      con Zenify. Escribe, reflexiona y establece metas en tu
                      santuario digital privado. ¡Comienza tu viaje hoy mismo!
                    </p>
                    <p className="text-sm pb-2">
                      📝 Crea Entradas Diarias: Captura tus pensamientos,
                      experiencias y emociones.
                    </p>
                    <p className="text-sm pb-2">
                      📚 Organiza y Reflexiona: Explora fácilmente entradas
                      anteriores y observa cuánto has avanzado.
                    </p>
                    <p className="text-sm pb-2">
                      🎯 Establece Metas: Sigue tu progreso y celebra tus
                      logros.
                    </p>
                    <p className="text-sm pb-2">
                      🌟 Encuentra Inspiración: Explora preguntas y citas para
                      avivar tu creatividad.
                    </p>
                    <p className="text-sm pb-2">
                      🔒 Seguro y Privado: Tu información está segura y
                      completamente confidencial.
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
