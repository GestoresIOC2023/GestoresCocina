import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function NavBar() {
    const session = await getSession();
  return (
    <header className="px-2 py-4 flex items-center">
      <div className="grow flex justify-center">
        <Link
          className="p-1 border-b-2 border-transparent hover:border-b-2 hover:border-gray-600 "
          href="/profile"
        >
          Home
        </Link>
      </div>
      <div className="">
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
      </div>
    </header>
  );
}
