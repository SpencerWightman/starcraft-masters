import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/nextAuthOptions";
import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { leaderboardSeason } from "@/constants/constants";

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const validateFantasyTeam = (team: unknown): team is string[] =>
  Array.isArray(team) &&
  team.length > 0 &&
  team.every((p) => /^[a-zA-Z0-9]{2,20}$/.test(p));

export async function POST(req: Request) {
  try {
    const session = await getServerSession({ req, ...authOptions });
    if (!session)
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });

    const { fantasyTeam } = await req.json();
    if (!validateFantasyTeam(fantasyTeam))
      return NextResponse.json({ error: "Invalid roster" }, { status: 400 });

    const now = Date.now();
    const ttlSeconds = 3;
    const nextWindow = now + ttlSeconds * 1000;

    const params = {
      TableName: process.env.AWS_TABLE!,
      Key: {
        email: { S: session.email },
        season: { N: leaderboardSeason },
      },
      UpdateExpression:
        "SET #team = :team, #username = :username, #points = :points, #next = :next",
      ConditionExpression: "attribute_not_exists(#next) OR #next < :now",
      ExpressionAttributeNames: {
        "#team": "team",
        "#username": "username",
        "#points": "points",
        "#next": "nextSubmission",
      },
      ExpressionAttributeValues: {
        ":team": { L: fantasyTeam.map((p: string) => ({ S: p })) },
        ":username": { S: session.username },
        ":points": { N: "0" },
        ":next": { N: String(nextWindow) },
        ":now": { N: String(now) },
      },
    };

    try {
      await client.send(new UpdateItemCommand(params));
      return NextResponse.json({ ok: true });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      if (err.name === "ConditionalCheckFailedException") {
        return NextResponse.json({ error: "Too frequent" }, { status: 429 });
      }
      throw err;
    }
  } catch (err) {
    console.error("Save team failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
