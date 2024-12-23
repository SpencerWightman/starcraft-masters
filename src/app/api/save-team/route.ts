import { NextResponse } from "next/server";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

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
    const { email, fantasyTeam, username } = body;

    if (!email || !Array.isArray(fantasyTeam)) {
      console.error("Invalid input:", body);
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    const teamItems = fantasyTeam.map((player) => ({ S: player }));

    const params = {
      TableName: process.env.AWS_TABLE!,
      Key: { email: { S: email } },
      UpdateExpression:
        "SET #team = :team, #username = :username, #season = :season",
      ExpressionAttributeNames: {
        "#team": "team",
        "#username": "username",
        "#season": "season",
        "#points": "points",
      },
      ExpressionAttributeValues: {
        ":team": { L: teamItems },
        ":username": { S: username },
        ":season": { S: "19" },
        ":points": { N: "0" },
      },
    };

    await client.send(new UpdateItemCommand(params));

    return NextResponse.json({ message: "Team saved successfully" });
  } catch (error) {
    console.error("Error saving team:", error);
    return NextResponse.json({ error: "Failed to save team" }, { status: 500 });
  }
}
