import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

export default async function Home() {
  const session = await getSession();
  return (
    <h1 className="text-4xl text-center py-8">Pagina Home</h1>

  );
}
