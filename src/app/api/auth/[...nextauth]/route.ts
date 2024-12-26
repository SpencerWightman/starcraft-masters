import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import {
  DynamoDBClient,
  GetItemCommand,
  PutItemCommand,
  GetItemCommandInput,
  PutItemCommandInput,
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
  }

  interface Session {
    id: string;
    username: string;
    email: string;
  }

  interface JWT {
    id: string;
    username: string;
    email: string;
  }
}

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        email: { label: "Email", type: "text", required: false },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Missing credentials");
        }

        const { username, password, email } = credentials;
        const tableName = process.env.AWS_TABLE_USERS;

        if (!tableName) {
          throw new Error("Table name not defined in environment variables");
        }

        const getParams: GetItemCommandInput = {
          TableName: tableName,
          Key: {
            email: { S: email },
          },
        };

        try {
          const user = await client.send(new GetItemCommand(getParams));
          if (!user.Item) {
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
          }

          if (user.Item && user.Item.password?.S) {
            const isPasswordValid = await bcrypt.compare(
              password,
              user.Item.password.S
            );

            if (isPasswordValid) {
              return {
                id: user.Item.email.S ?? "",
                username: user.Item.username.S ?? "",
                email: user.Item.email.S ?? "",
              };
            }
            throw new Error("Invalid password.");
          }
          throw new Error("User not found or password missing.");
        } catch (error) {
          throw new Error("Failed to authenticate");
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
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session.id = token.id as string;
        session.username = token.username as string;
        session.email = token.email as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
