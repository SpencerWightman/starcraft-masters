import { handleAuth } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

export const GET = async (
  req: NextRequest,
  context: { params: { auth0: string[] } }
) => {
  const params = await context.params;
  return handleAuth()(req, { params });
};

export const POST = async (
  req: NextRequest,
  context: { params: { auth0: string[] } }
) => {
  const params = await context.params;
  return handleAuth()(req, { params });
};
