import { NextResponse } from "next/server";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, team } = body;

    const params = {
      TableName: process.env.AWS_TABLE!,
      Item: {
        email: { S: email },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        team: { L: team.map((player: any) => ({ S: player.handle })) },
      },
    };

    await client.send(new PutItemCommand(params));

    return NextResponse.json({ message: "Team saved successfully" });
  } catch (error) {
    console.error("Error saving team:", error);
    return NextResponse.json({ error: "Failed to save team" }, { status: 500 });
  }
}
