import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  GetItemCommandInput,
  PutItemCommandInput,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { User } from "next-auth";

const SALT_ROUNDS = 8;

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    email: string;
    lastSubmission?: string;
  }

  interface Session {
    id: string;
    username: string;
    email: string;
    lastSubmission?: string;
  }

  interface JWT {
    id: string;
    username: string;
    email: string;
    lastSubmission?: string;
  }
}

const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9]{3,12}$/;
  return usernameRegex.test(username);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "text", required: false },
        mode: { label: "Mode", type: "text" },
      },
      async authorize(
        credentials:
          | Record<"email" | "username" | "password" | "mode", string>
          | undefined
      ) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const { username, password, email, mode } = credentials;
        const tableName = process.env.AWS_TABLE_USERS;

        if (!validateEmail(email)) {
          throw new Error("Invalid characters in the email.");
        }

        if (!validateUsername(username)) {
          throw new Error(
            "Username must be between 3 and 12 characters. No special characters."
          );
        }

        if (!tableName) {
          throw new Error("Nuclear error. Please message Lurkerbomb.");
        }

        if (!email || !password || !mode) {
          throw new Error("Missing required fields");
        }

        const getParams: GetItemCommandInput = {
          TableName: tableName,
          Key: {
            email: { S: email },
          },
        };

        try {
          const user = await client.send(new GetItemCommand(getParams));

          if (mode === "signup") {
            // Handle sign-up
            if (user.Item) {
              throw new Error("User already exists");
            }

            // Check if username is unique
            const usernameCheckParams = {
              TableName: tableName,
              IndexName: "username-index",
              KeyConditionExpression: "username = :username",
              ExpressionAttributeValues: {
                ":username": { S: username },
              },
            };

            const usernameCheck = await client.send(
              new QueryCommand(usernameCheckParams)
            );

            if (usernameCheck.Count && usernameCheck.Count > 0) {
              throw new Error("Username already taken");
            }

            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
            const putParams: PutItemCommandInput = {
              TableName: tableName,
              Item: {
                email: { S: email },
                username: { S: username },
                password: { S: hashedPassword },
              },
            };

            await client.send(new PutItemCommand(putParams));
            return { id: email, username, email };
          } else if (mode === "login") {
            // Handle login
            if (!user.Item || !user.Item.password?.S) {
              throw new Error("Invalid credentials");
            }

            const isPasswordValid = await bcrypt.compare(
              password,
              user.Item.password.S
            );

            if (isPasswordValid) {
              return {
                id: user.Item.email.S ?? "",
                username: user.Item.username.S ?? "",
                email: user.Item.email.S ?? "",
                lastSubmission: user.Item.lastSubmission?.S || "",
              };
            } else {
              throw new Error("Invalid credentials");
            }
          } else {
            throw new Error("Invalid mode");
          }
        } catch (error: unknown) {
          const message =
            error instanceof Error ? error.message : "Failed to authenticate";
          throw new Error(message);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 365 * 24 * 60 * 60,
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 365 * 24 * 60 * 60,
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user) {
        token.id = user.id;
        token.username = user.username;
        token.email = user.email;
        token.lastSubmission = user.lastSubmission;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.id = token.id as string;
        session.username = token.username as string;
        session.email = token.email as string;
        session.lastSubmission = token.lastSubmission as string;
      }
      return session;
    },
  },
};
