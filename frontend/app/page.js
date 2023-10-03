import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  return (
    <>
      <div className="h-screen gap-4 flex justify-center items-center">
        {session ? (
          <a
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded "
            href="/api/auth/logout"
          >
            Logout
          </a>
        ) : (
          <a
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
            href="/api/auth/login"
          >
            Login
          </a>
        )}
        <Link href="/profile">Ir a la pagina profile</Link>
      </div>
    </>
  );
}
