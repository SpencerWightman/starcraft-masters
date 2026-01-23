export const revalidate = 10;

import { NextResponse } from "next/server";
import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { leaderboardSeason } from "@/constants/constants";

export async function GET() {
  try {
    const db = new DynamoDBClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });

    const res = await db.send(
      new QueryCommand({
        TableName: process.env.AWS_TABLE,
        IndexName: "season-points-index",
        KeyConditionExpression: "season = :season",
        ExpressionAttributeValues: { ":season": { N: leaderboardSeason } },
        ScanIndexForward: false,
        Limit: 100,
      }),
    );

    const items = (res.Items ?? []).map((i) => ({
      username: i.username?.S ?? "???",
      team: (i.team?.L ?? []).map((m) => m.S || "???"),
      points: Number(i.points?.N ?? "0"),
    }));

    return NextResponse.json(items);
  } catch {
    return NextResponse.json(
      { message: "Leaderboard temporarily unavailable." },
      { status: 500 },
    );
  }
}
