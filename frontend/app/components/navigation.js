import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";

export default async function NavigationBar() {
    const session = await getSession();
  return (
    <div className="flex px-5 py-3 bg-black text-white items-center">
     <div className="relative w-12 h-12">
        <Image fill src="/logo_white.png" alt="Logo"/>
      </div>
      <nav className="grow">
        <ul className="flex justify-center gap-2">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/profile">Profile</Link></li>
          <li><Link href="/recipes">Last recipes</Link></li>
        </ul>
      </nav>
      <div className="">
        {session ? (
          <a
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-4 border border-red-700 rounded "
            href="/api/auth/logout"
          >
            Logout
          </a>
        ) : (
          <a
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 border border-blue-700 rounded"
            href="/api/auth/login"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
}
