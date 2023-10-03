import { handleAuth, handleLogin } from '@auth0/nextjs-auth0';

export const GET = handleAuth({
    login: handleLogin({
      authorizationParams: {
        audience: 'http://localhost:5001', // or AUTH0_AUDIENCE
        // Add the `offline_access` scope to also get a Refresh Token
        scope: 'openid profile email' // or AUTH0_SCOPE
      }
    })
  });