import { getAccessToken } from "@auth0/nextjs-auth0";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import { getSession } from "@auth0/nextjs-auth0";

export default withPageAuthRequired(
  async function Profile() {
    async function insertUser() {
      const { user } = await getSession();
      const { accessToken } = await getAccessToken();
      await fetch("http://localhost:5001/api/v1/users", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          id: user.sub,
          email: user.email,
          nickname: user.nickname,
          update: user.updated_at,
        }),
      });
    }
    async function getUsers() {
      const { user } = await getSession();
      const params = new URLSearchParams({
        id: user.sub,
      });
      const { accessToken } = await getAccessToken();
      const response = await fetch(
        "http://localhost:5001/api/v1/users?" + params.toString(),
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const users = await response.json();
      return users;
    }
    await insertUser();
    const { users } = await getUsers();
    console.log(users);
    return (
      <div className="flex gap-6 justify-center py-10 items-center basis-1">
          <p>Hello {users[0].nickname}</p>
        <a
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700 rounded "
          href="/api/auth/logout"
        >
          Logout
        </a>
      </div>
    );
  },
  { returnTo: "/profile" }
);
// You need to provide a `returnTo` since Server Components aren't aware of the page's URL
