import { getAccessToken } from "@auth0/nextjs-auth0";

export async function PUT(request) {
   const  {accessToken} = await getAccessToken();
   const data = await request.formData();
   console.log(data.get("files"))
    await fetch("http://localhost:5001/api/v1/users", {
        method: "PUT",
        headers:{
          "Authorization": `Bearer ${accessToken}`,
        },
        
        body: data
      });
      return Response.json({ok:"ok"})
}