import { handleAuth } from "@auth0/nextjs-auth0";
import { NextRequest } from "next/server";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const GET = async (req: NextRequest, context: any) => {
  const params = await context.params;
  return handleAuth()(req, { params });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const POST = async (req: NextRequest, context: any) => {
  const params = await context.params;
  return handleAuth()(req, { params });
};
