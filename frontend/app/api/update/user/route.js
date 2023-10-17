import { getAccessToken } from "@auth0/nextjs-auth0";
import { withApiAuthRequired } from "@auth0/nextjs-auth0";

export const PUT = withApiAuthRequired(async function uploadUser(request) {
   const  {accessToken} = await getAccessToken();
   const data = await request.formData();
    await fetch("http://localhost:5001/api/v1/users", {
        method: "PUT",
        headers:{
          "Authorization": `Bearer ${accessToken}`,
        },
        
        body: data
      });
      return Response.json({ok:"ok"})
});