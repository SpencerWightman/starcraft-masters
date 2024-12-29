import { NextResponse } from "next/server";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const validateUsername = (username: string): boolean => {
  const usernameRegex = /^[a-zA-Z0-9]{3,12}$/;
  return usernameRegex.test(username);
};

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email);
};

const validateFantasyTeam = (fantasyTeam: string[]): boolean => {
  const playerRegex = /^[a-zA-Z0-9]{2,20}$/;
  return fantasyTeam.every((player) => playerRegex.test(player));
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, fantasyTeam, username } = body;

    if (!email || !Array.isArray(fantasyTeam)) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid characters in the email." },
        { status: 400 }
      );
    }

    if (!validateUsername(username)) {
      return NextResponse.json(
        {
          error:
            "Username must be between 3 and 12 characters. No special characters.",
        },
        { status: 400 }
      );
    }

    if (!validateFantasyTeam(fantasyTeam)) {
      return NextResponse.json(
        {
          error: "Invalid player in your team.",
        },
        { status: 400 }
      );
    }

    const teamItems = fantasyTeam.map((player) => ({ S: player }));

    const params = {
      TableName: process.env.AWS_TABLE!,
      Key: {
        email: { S: email },
        season: { N: "19" },
      },
      UpdateExpression:
        "SET #team = :team, #username = :username, #points = :points",
      ExpressionAttributeNames: {
        "#team": "team",
        "#username": "username",
        "#points": "points",
      },
      ExpressionAttributeValues: {
        ":team": { L: teamItems },
        ":username": { S: username },
        ":points": { N: "0" },
      },
    };

    const response = await client.send(new UpdateItemCommand(params));

    return NextResponse.json({ message: "Team saved successfully", response });
  } catch {
    return NextResponse.json({ error: "Failed to save team" }, { status: 500 });
  }
}
