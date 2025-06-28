import { NextResponse } from "next/server";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { leaderboardSeason } from "@/constants/constants";

export const revalidate = 60;

export async function GET() {
  const client = new DynamoDBClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const params = {
    TableName: process.env.AWS_TABLE,
    IndexName: "season-points-index",
    KeyConditionExpression: "season = :season",
    ExpressionAttributeValues: {
      ":season": { N: leaderboardSeason },
    },
    ScanIndexForward: false,
    Limit: 100,
  };

  try {
    const data = await client.send(new QueryCommand(params));

    const items = (data.Items ?? []).map((item) => ({
      username: item.username?.S ?? "||||||",
      team: (item.team?.L ?? []).map((m) => m.S || "||||||"),
      points: Number(item.points?.N ?? "0"),
    }));

    return NextResponse.json(items, { status: 200 });
  } catch (err) {
    console.error("Leaderboard query failed:", err);
    return NextResponse.json(
      { message: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
