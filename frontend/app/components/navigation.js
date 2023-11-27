import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import Image from "next/image";

export default async function NavigationBar() {
  const session = await getSession();
  return (
    <div className="flex px-5 h-32 bg-white text-[#311A0E] items-center sticky top-0 z-50">
      <div className=" hidden md:block relative w-52 h-44 p-4  bg-[#502918] rounded-b-3xl overflow-hidden">
        <Image src="/logo_white.png" alt="Logo" layout="fill" objectFit="contain" className="pt-3.5" />
      </div>
      <nav className="grow">
        <ul className="flex justify-center gap-2">
          <li className="hover:text-[#311A0E] hover:font-bold active: font-bold text-lg px-3">
            <Link href="/">HOME</Link>
          </li>
          <li className="hover:text-[#311A0E] hover:font-bold text-lg px-3">
            <Link href="/profile">PROFILE</Link>
          </li>
        </ul>
      </nav>
      <div className="">
        {session ? (
          <a
            className="bg-white hover:bg-[#311A0E] hover:text-white text-[#311A0E] font-semibold py-2 px-5 border border-[#311A0E] rounded-3xl text-lg"
            href="/api/auth/logout"
          >
            Logout
          </a>
        ) : (
          <a
            className="bg-white hover:bg-[#311A0E] hover:text-white text-[#311A0E] font-semibold py-2 px-5 border border-[#311A0E] rounded-3xl text-lg"
            href="/api/auth/login"
          >
            Login
          </a>
        )}
      </div>
    </div>
  );
}
