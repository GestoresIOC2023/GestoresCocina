import { getAccessToken } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";
import Link from "next/link";
import UserPage from "../components/user";

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
          cache: "no-cache",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const users = await response.json();
      return users;
    }
    let users;
    ({ users } = await getUser());
    if (!users.length) {
      const result = await createUser();
      ({ users } = result);
    }
    return <UserPage {...users[0]} />;
  },
  { returnTo: "/profile" }
);
