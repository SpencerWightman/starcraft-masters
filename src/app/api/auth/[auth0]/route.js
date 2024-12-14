import { handleAuth, handleLogin, handleLogout } from "@auth0/nextjs-auth0";

export const GET = handleAuth({
  onLogin: async (req, res) => {
    const currentUrl = req.headers.referer || "/";
    await handleLogin(req, res, {
      authorizationParams: {
        state: JSON.stringify({ returnTo: currentUrl }),
      },
    });
  },
  onLogout: async (req, res) => {
    const currentUrl = req.headers.referer || "/";
    await handleLogout(req, res, { returnTo: currentUrl });
  },
});
