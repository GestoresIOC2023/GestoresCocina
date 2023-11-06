import { getAccessToken } from "@auth0/nextjs-auth0";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

//Envia las fotos al servidor Express
export const POST = withApiAuthRequired(async function uploadUser(
  request,
  response
) {
  const { accessToken } = await getAccessToken();
  const data = await request.formData();
  await fetch("http://localhost:5001/api/v1/recipes", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },

    body: data,
  });
  return response;
});
