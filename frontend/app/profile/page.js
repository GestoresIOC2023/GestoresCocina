import { getAccessToken, withPageAuthRequired, getSession } from '@auth0/nextjs-auth0';
import MenuUser from '../components/menuUser';

// página protegida
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
      return await getUser(); 
    }

    async function getUser() {
      const { user } = await getSession();
      const { accessToken } = await getAccessToken();
      const response = await fetch(`http://localhost:5001/api/v1/userById/${user.sub}`, {
        cache: "no-cache",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = await response.json();
      return data.users || [];
    }

    let users = await getUser();
    if (!users.length) {
      users = await createUser();
    }

    return (
      <MenuUser users={users} />
    );
  },
  { returnTo: "/profile" }
);
