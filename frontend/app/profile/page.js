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
      const { accessToken } = await getAccessToken();
      const response = await fetch(
        `http://localhost:5001/api/v1/userById/${user.sub}`,
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
      <div>
        <h1 className="text-4xl text-center py-8">Pagina profile</h1>
        <p className="px-4">Hola {users[0].nickname}</p>
        <Link className="mx-4 px-4 py-1 bg-green-400" href="/profile/update">
          Actualizar
        </Link>
      </div>
    );
  },
  { returnTo: "/profile" }
);
