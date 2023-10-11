import { getAccessToken } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";

//Pagina protegida
export default withPageAuthRequired(
  async function Profile() {

    async function createUser() {
      const { user } = await getSession();
      const { accessToken } = await getAccessToken();
      await fetch("http://localhost:5001/api/v1/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          user_id: user.sub,
          email: user.email,
          nickname: user.nickname,
          profile_picture: user.picture,
          updated_at: user.updated_at,
        }),
      });
    }
    async function getUser() {
      const { user } = await getSession();
      const params = new URLSearchParams({
        user_id: user.sub,
      });
      const { accessToken } = await getAccessToken();

      const response = await fetch(
        "http://localhost:5001/api/v1/userById?" + params.toString(),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const users = await response.json();
      return users;
    }
    await createUser();
    const { users } = await getUser();
    return (
      <div className="flex gap-6 justify-center py-10 items-center basis-1">
        <p>Hola {users[0].nickname}</p>
        <a
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded "
          href="/api/auth/logout"
        >
          Logout
        </a>
        <Link href="/" >Ir a Home</Link>
      </div>
    );
  },
  { returnTo: "/profile" }
);
